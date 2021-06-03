FROM node:latest

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 45001

ENTRYPOINT ["npm","run","start"]