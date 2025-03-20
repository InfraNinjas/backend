FROM docker.io/node:lts-slim

WORKDIR /usr/src/app

RUN groupadd -g 10001 dotnet && \
   useradd -u 10000 -g dotnet dotnet \
   && chown -R dotnet:dotnet /usr/src/app

USER dotnet:dotnet

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

ENTRYPOINT ["npm", "run"]

CMD ["start"]
