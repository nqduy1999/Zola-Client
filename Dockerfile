FROM node:12.14.1 AS build-env
RUN npm i yarn cross-env && yarn install && yarn build
CMD ["server.js"]