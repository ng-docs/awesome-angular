#!/usr/bin/env bash

set -x
set -e

npm run build

npm run build:ssr

kill `lsof -t -i :4000` || true

npm run serve:ssr &

rm -fr /tmp/awesome-preview.angular.live

git clone https://asnowwolf:${GITHUB_ACCESS_TOKEN}@github.com/ng-docs/awesome-angular-preview.git /tmp/awesome-preview.angular.live

cp -r ./dist/awesome-angular/* /tmp/awesome-preview.angular.live/

cp ./dist/awesome-angular/index.html /tmp/awesome-preview.angular.live/404.html

sleep 3

wget -m --adjust-extension localhost:4000 -P /tmp

kill `lsof -t -i :4000`

cp -r /tmp/localhost:4000/* /tmp/awesome-preview.angular.live/

rm -fr /tmp/localhost:4000

commitMessage=$(git log --oneline -n 1)

cd /tmp/awesome-preview.angular.live/

git add .
git commit -am "${commitMessage}"

git push

cd -

set +x
set +e
