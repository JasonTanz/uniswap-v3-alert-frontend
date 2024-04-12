FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN yarn install --slient

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]