# Usar imagen oficial de Node.js
FROM node:20-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install && npm install joi

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto (ajusta si usas otro)
EXPOSE 4000

# Comando para iniciar la app
CMD ["node", "src/index.js"]
