# Shopping cart

**This service contains CRUD API to shopping cart.**

## Setup

- Add .env file, copy .env.example contents to .env
- Get dependencies: `npm install`
- Run locally: `npm start`
- Build docker image: `docker build -t feed_search .`
- Run docker image: `docker run -d -p 3000:3000 feed_search`
- To deploy on server use pm2: `pm2 start src/index.js -i max`

## Test

- Add NODE_ENV=test to .env file
- To run all the test cases: `npm test`
