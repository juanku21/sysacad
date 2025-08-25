
# ESTE ARCHIVO SIRVE PARA CREAR LA IMAGEN DE DOCKER DE NUESTRO PROYECTO

# Definimos la imagen de base que va a utilizar nuestro contenedor backend
FROM node:22-alpine

# Definimos el directorio del contenedor en el cual va a estar nuestra aplicaciónm
WORKDIR /app

# Copiamos el código del proyecto directamente al directorio de trabajo del contenedir
COPY . .

# Ejecutamos el comando para instalar las dependencias que utiliza nuestra aplicación
RUN npm install
RUN npx prisma generate

# Definimos el puerto interno del contenedor donde la aplicación se va a ejecutar
EXPOSE 3000

# Comando que se ejecuta automáticamente cuento se levanta el contendor (no cuando se construye la imagen)
CMD ["npm", "run", "dev"]

