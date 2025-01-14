# 1️⃣ Usa una imagen base de Node.js
FROM node:18

# 2️⃣ Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# 3️⃣ Copia los archivos de package.json y package-lock.json
COPY package*.json ./

# 4️⃣ Instala las dependencias
RUN npm install

# 5️⃣ Copia el código de la API al contenedor
COPY . .

# 6️⃣ Expone el puerto que usa la API (ejemplo: 3000)
EXPOSE 3000

# 7️⃣ Comando para ejecutar la API
CMD ["npm", "start"]