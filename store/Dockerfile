FROM node:20.13.0-alpine

WORKDIR /app

# Установите Python и build tools (нужно для некоторых зависимостей)
RUN apk add --no-cache python3 make g++

# Копируем зависимости
COPY package.json package-lock.json ./

# Установка с legacy-peer-deps (решает большинство проблем)
RUN npm install --legacy-peer-deps --no-audit --no-fund

# Копируем код
COPY . .

# Сборка Next.js
RUN npm run build

EXPOSE 3001

CMD ["npm", "start", "--", "-H", "0.0.0.0"]