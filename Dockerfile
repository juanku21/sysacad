# ESTE ARCHIVO SIRVE PARA CREAR LA IMAGEN DE DOCKER DE NUESTRO PROYECTO

# Definimos la imagen de base que va a utilizar nuestro contenedor backend
FROM node:22-alpine

# Instalamos Chromium y las dependencias necesarias
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Definimos el directorio del contenedor en el cual va a estar nuestra aplicación
WORKDIR /app

# Configuramos las variables de entorno para Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Copiamos el código del proyecto directamente al directorio de trabajo del contenedor
COPY . .

# Ejecutamos el comando para instalar las dependencias que utiliza nuestra aplicación
RUN npm install
RUN npx prisma generate

# Definimos el puerto interno del contenedor donde la aplicación se va a ejecutar
EXPOSE 3000

# Comando que se ejecuta automáticamente cuando se levanta el contenedor
CMD ["npm", "run", "dev"]