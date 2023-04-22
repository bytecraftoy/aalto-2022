FROM node:18 as builder
ENV BUILD_DIR /usr/src/app

WORKDIR ${BUILD_DIR}/frontend

# copy frontend config and install dependencies
COPY ./frontend/package*.json .
RUN npm ci

# copy frontend code
COPY ./frontend .

# build frontend
RUN npm run build

WORKDIR ${BUILD_DIR}/backend

# copy frontend build to backend public folder
RUN mkdir ./build && cp -r "$BUILD_DIR/frontend/build" ./build/public

# copy backend config and install dependencies
COPY ./backend/package*.json .
RUN npm ci

# copy all backend files
COPY ./backend .

# build backend
RUN npm run build

FROM node:18-alpine
ENV BUILD_DIR /usr/src/app

WORKDIR /home/app

RUN chown -R node:node /home/app

# Install production dependencies
COPY --from=builder ${BUILD_DIR}/backend/package*.json ./
RUN npm ci --omit=dev

# copy only needed files from builder
COPY --from=builder --chown=node:node ${BUILD_DIR}/backend/migrations/ ./migrations/
COPY --from=builder --chown=node:node ${BUILD_DIR}/backend/files/ ./files/
COPY --from=builder --chown=node:node ${BUILD_DIR}/backend/build/ ./

USER node

EXPOSE 3030

CMD ["node", "index.js"]
