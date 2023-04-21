FROM node:18
WORKDIR /usr/src/app
# copy frontend and build it
COPY ./frontend ./frontend
RUN cd frontend && npm i && npm run build && cd ..
# copy all backend files
COPY ./backend ./backend
# copy frontend build to backend public folder
RUN mkdir ./backend/public ; cp -r ./frontend/build/* ./backend/public/ && rm -r frontend
# build backend
RUN cd ./backend && npm run setup && npm run build

EXPOSE 3030

CMD cd ./backend && npm start