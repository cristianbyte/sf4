# Usa Node oficial (Debian-based, ya incluye certificados)
FROM node:20

# Setea el directorio de trabajo
WORKDIR /app

# Copia package.json y package-lock.json primero (para cache de dependencias)
COPY package*.json ./

# Instala dependencias
RUN npm install --production

# Copia el resto del código
COPY . .

# Expón el puerto (Fly usará el 8080)
EXPOSE 8080

# Arranca la app
CMD ["node", "index.js"]
