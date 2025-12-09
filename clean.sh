#!/bin/bash
echo "Удаление неиспользуемых пакетов..."
npm uninstall @babel/core @babel/preset-env autoprefixer babel-loader compression-webpack-plugin cssnano file-loader image-minimizer-webpack-plugin imagemin imagemin-avif imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo imagemin-webp postcss-loader svgo

echo "Очистка node_modules..."
rm -rf node_modules package-lock.json

echo "Установка свежих зависимостей..."
npm install

echo "Готово! Текущие зависимости:"
npm list --depth=0
