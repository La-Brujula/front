#!/bin/bash
cd ~/apps/labrujulaaudiovisual_opalstack_com_http/production/
INITIAL_ID=$(git rev-parse HEAD)
git add -A
git commit -m "manual changes"
git pull origin main
git push origin main
git pull origin main
POSTUPDATE_ID=$(git rev-parse HEAD)

[ $INITIAL_ID = $POSTUPDATE_ID ] && exit 0

npm run build