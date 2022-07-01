FROM node:lts-alpine

WORKDIR /usr/app

COPY package.json yarn.lock pre-install.js ./

COPY bin/pre-install.sh ./bin

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
