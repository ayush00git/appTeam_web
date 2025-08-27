FROM node:18 AS backend-builder

WORKDIR /app

COPY package.*json .

RUN npm i

COPY . .

FROM node:18 AS backend-runner

WORKDIR /app

COPY package.*json .

RUN npm i --omit=dev

COPY --from=backend-builder /app .

EXPOSE 8000

CMD ["npm", "start"]