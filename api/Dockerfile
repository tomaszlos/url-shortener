FROM node:14-alpine
RUN yarn global add pm2

WORKDIR /usr/src/app

COPY . .

RUN yarn install

EXPOSE 3000

CMD [ "pm2-runtime", "index.js" ]

