FROM node:21-alpine3.18

WORKDIR /app

COPY package*.json .

RUN npm ci && npm cache clean --force

COPY . .

CMD ["npm", "run", "dev"]
