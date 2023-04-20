FROM node:18
WORKDIR /usr/src/app
COPY . ./
RUN npm run setup
RUN echo "POSTGRES_HOST=db" >> .env
RUN echo "ENVIRONMENT=openai" >> .env
RUN echo "PROXYURL=http://proxy:8080" >> .env
RUN npm run build
EXPOSE 3030
CMD npm start