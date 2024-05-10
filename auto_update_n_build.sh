#!/bin/bash
source scl_source enable nodejs20

cd ~/apps/labrujulaaudiovisual_opalstack_com_http/production/

INITIAL_ID=$(git rev-parse HEAD)
git fetch ssh
git reset --hard ssh/main
POSTUPDATE_ID=$(git rev-parse HEAD)

[ $INITIAL_ID = $POSTUPDATE_ID ] && exit 0

npm install yarn

npx yarn

npx yarn build

echo "built $(date)" >> builds.log

rm -rf ~/apps/www_labrujula_com_mx_https/*

cp -rf dist/. ~/apps/www_labrujula_com_mx_https/
