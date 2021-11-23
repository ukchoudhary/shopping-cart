FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install pm2 -g
RUN npm install
COPY . .

CMD ["pm2", "start", "src/index.js", "-i max"]