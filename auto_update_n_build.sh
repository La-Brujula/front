#!/bin/bash
cd ~/apps/labrujulaaudiovisual_opalstack_com_http/production/
INITIAL_ID=$(git rev-parse HEAD)
git fetch ssh
git reset --hard ssh/main
POSTUPDATE_ID=$(git rev-parse HEAD)

[ $INITIAL_ID = $POSTUPDATE_ID ] && exit 0

yarn

yarn build

echo "built $(date)" >> builds.log
