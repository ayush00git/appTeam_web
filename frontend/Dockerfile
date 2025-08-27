FROM node:18 AS frontend-builder

WORKDIR /app

COPY package.*json .

RUN npm i

COPY . .
RUN npm run build

FROM nginx:alpine AS frontend-runner

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=frontend-builder /app/dist .
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
