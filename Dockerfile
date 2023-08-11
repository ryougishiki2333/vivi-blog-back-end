FROM node:16-alpine

WORKDIR /back-end

COPY . .

RUN npm i 

RUN npm run build

CMD ["node", "dist/app.js"]