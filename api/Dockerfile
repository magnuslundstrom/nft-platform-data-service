FROM node:latest

WORKDIR /usr/api

COPY package*.json ./

RUN npm install 

CMD ["npm", "run", "dev"]