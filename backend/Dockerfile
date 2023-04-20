FROM node:18
WORKDIR /usr/src/app
COPY . ./
RUN npm run setup
RUN echo "POSTGRES_HOST=db" >> .env
RUN npm run build
EXPOSE 3030
CMD npm start