#!/usr/bin/env bash

npm run build
cp -r ./dist/awesome-angular/* ./prebuilt
cd ./prebuilt
cp index.html 404.html

git add .
git commit -am "publish"

git push
