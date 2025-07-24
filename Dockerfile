# Temel Node.js imajı kullanılır
FROM node:18

# Çalışma dizinini ayarla
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Tüm proje dosyalarını kopyala
COPY . .

# API'nin çalışacağı portu belirt
EXPOSE 8080

# Uygulamayı başlat
CMD ["node", "app.js"]
