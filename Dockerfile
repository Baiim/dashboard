FROM node:10.16.3

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm install next-i18next
#pm install  webpack && npm install  webpack-cli && npm install  concurrently

RUN npm run build

CMD ["npm","run", "start"]