FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json* hardhat.config.js ./
RUN npm install
RUN mkdir -p contracts scripts
CMD ["tail", "-f", "/dev/null"]