FROM node:20-slim

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY ./ ./

EXPOSE 5173

RUN npm run build


CMD ["npm", "run", "start"]
