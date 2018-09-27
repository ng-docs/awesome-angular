#!/usr/bin/env bash

set -x
set -e

#npm run build

#npm run build:ssr

kill `lsof -t -i :4000` || true

npm run serve:ssr &

cp -r ./dist/awesome-angular/* ./prebuilt/

cp ./dist/awesome-angular/index.html ./prebuilt/404.html

sleep 3

wget -m --adjust-extension localhost:4000 -P /tmp

kill `lsof -t -i :4000`

cp -r /tmp/localhost:4000/* prebuilt

rm -fr /tmp/localhost:4000

commitMessage=$(git log --oneline -n 1)

cd prebuilt

git add .
git commit -am "${commitMessage}"

git push

cd -

set +x
set +e
