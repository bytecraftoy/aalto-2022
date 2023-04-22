FROM node:18 as builder
ENV ROOT_PATH /usr/src/app

WORKDIR ${ROOT_PATH}/frontend

# copy frontend config and install dependencies
COPY ./frontend/package*.json .
RUN npm ci

# copy frontend code
COPY ./frontend .

# build frontend
RUN npm run build

WORKDIR ${ROOT_PATH}/backend

# copy frontend build to backend public folder
RUN mkdir ./build && cp -r "$ROOT_PATH/frontend/build" ./build/public

# copy backend config and install dependencies
COPY ./backend/package*.json .
RUN npm ci

# copy all backend files
COPY ./backend .

# build backend
RUN npm run build

FROM node:18-alpine
ENV ROOT_PATH /usr/src/app

WORKDIR /home/app

RUN chown -R node:node /home/app

# Install production dependencies
COPY --from=builder ${ROOT_PATH}/backend/package*.json ./
RUN npm ci --omit=dev

# copy only needed files from builder
COPY --from=builder --chown=node:node ${ROOT_PATH}/backend/migrations/ ./migrations/
COPY --from=builder --chown=node:node ${ROOT_PATH}/backend/files/ ./files/
COPY --from=builder --chown=node:node ${ROOT_PATH}/backend/build ./

USER node

EXPOSE 3030

CMD ["node", "index.js"]
