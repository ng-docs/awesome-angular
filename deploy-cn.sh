#!/usr/bin/env bash

set -x
set -e

npm run build

commitMessage=$(git log --oneline -n 1)

kill `lsof -t -i :4000` || true

npx http-server-spa dist/awesome-angular index.html 4000 &

rm -fr /tmp/awesome-angular-prerender || true

npx prerender mirror -r /tmp/awesome-angular-prerender/ http://localhost:4000/

kill `lsof -t -i :4000` || true

rm -fr /tmp/awesome.angular.live

git clone https://asnowwolf:${GITHUB_ACCESS_TOKEN}@github.com/asnowwolf/blog.git /tmp/awesome.angular.live

cp ./dist/awesome-angular/index.html /tmp/awesome.angular.live/404.html

cp -r ./dist/awesome-angular/* /tmp/awesome.angular.live/

cp -r /tmp/awesome-angular-prerender/localhost:4000/* /tmp/awesome.angular.live/

cd /tmp/awesome.angular.live/

git add .
git commit -am "${commitMessage}"

git push

cd -

set +x
set +e
