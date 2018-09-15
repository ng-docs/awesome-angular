#!/usr/bin/env bash

npm run build
cp -r ./dist/ng-blog/* ./prebuilt
cd ./prebuilt
git init
cp index.html 404.html
echo blog.angular.live > CNAME
echo blog.angular.cn >> CNAME

git add .
git commit -am "publish"

git push git@github.com:ng-docs/ng-blog.angular.cn.git master
