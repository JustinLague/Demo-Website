FROM node:lts-alpine as build-stage
RUN npm install -g http-server
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080
<<<<<<< HEAD:Daria Vuejs/client/Dockerfile
CMD [ "http-server", "dist" ]
=======
CMD [ "http-server", "dist" ]
>>>>>>> master:client/Dockerfile
