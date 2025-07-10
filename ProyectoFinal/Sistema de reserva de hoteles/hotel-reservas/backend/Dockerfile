# Usar imagen oficial de Node.js
FROM node:18-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto (ajusta si usas otro)
EXPOSE 3001

# Comando para iniciar la app
CMD ["npm", "start"]
