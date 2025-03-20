FROM docker.io/node:lts-slim

RUN mkdir -p /usr/src/app && chown -R node:node /usr/src/app
WORKDIR /usr/src/app

USER node

COPY --chown=node:node package.json .
RUN npm install

COPY --chown=node:node . .
RUN npm run build

ENTRYPOINT ["npm", "run"]
CMD ["start"]
