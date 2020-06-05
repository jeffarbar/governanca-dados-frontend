FROM node:12.2.0-alpine

WORKDIR /app

COPY package.json ./
RUN npm install
RUN npm install @vue/cli@3.7.0 -g
COPY . .


CMD ["npm", "run", "start"]
