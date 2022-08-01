FROM node:16-alpine

ENV PORT="3000"
ENV API_SECRET="e003906a-e650-4a3a-9d52-933c936e9f99"

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

CMD node index.js

EXPOSE 3000