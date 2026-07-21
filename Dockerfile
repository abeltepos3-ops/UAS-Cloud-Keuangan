# Menggunakan base image Node.js versi ringan
FROM node:20-alpine

# Menentukan direktori kerja di dalam container
WORKDIR /usr/src/app

# Menyalin file package.json dan menginstal dependensi
COPY package*.json ./
RUN npm install

# Menyalin seluruh source code aplikasi
COPY src ./src

# Membuka port 3000
EXPOSE 3000

# Menambahkan mekanisme Health Check (Syarat Wajib UAS)
HEALTHCHECK --interval=10s --timeout=5s --retries=3 \
  CMD wget --spider -q http://localhost:3000/health || exit 1

# Perintah untuk menjalankan aplikasi
CMD ["node", "src/index.js"]