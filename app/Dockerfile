FROM node:14-alpine
RUN yarn global add serve

WORKDIR /usr/src/app

COPY . .

RUN yarn install
RUN yarn build

EXPOSE 3000

CMD [ "serve", "build", "-l", "3000" ]

