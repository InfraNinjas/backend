FROM docker.io/node:lts-slim

WORKDIR /usr/src/app

COPY --chown=node:root package.json .
RUN npm install

COPY --chown=node:root . .
RUN npm run build

RUN mkdir -p /usr/src/app && \
  chown -R node:root /usr/src/app && \
  chmod -R g=u /usr/src/app 

USER node

ENTRYPOINT ["npm", "run"]
CMD ["start"]
