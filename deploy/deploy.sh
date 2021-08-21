#!/bin/sh

APP_NAME=app

git clone https://github.com/iteme/nuxt-admin.git && cd nuxt-admin
npm install && npm run build
docker image build -t $APP_NAME .
rm -rf ./nuxt-admin
cd /app && docker-compose up -d $APP_NAME
docker system prune -af
