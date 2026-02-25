# --- ETAPA 1: COMPILAR REACT ---
FROM node:18 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# --- ETAPA 2: SERVIDOR NGINX ---
# React necesita un servidor web rápido para mostrar sus archivos estáticos. Nginx es el estándar.
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]