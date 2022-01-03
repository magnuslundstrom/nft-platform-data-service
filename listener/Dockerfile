FROM node:latest

WORKDIR /usr/listener

COPY package*.json ./

RUN npm install 

CMD ["npm", "run", "dev"]