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

cd /tmp/awesome-angular-prerender

git add .
git commit -am "${commitMessage}"

cd -

set +x
set +e
