#!/bin/bash
cd ~/apps/labrujulaaudiovisual_opalstack_com_http/production/
INITIAL_ID=$(git rev-parse HEAD)
git pull origin main
POSTUPDATE_ID=$(git rev-parse HEAD)

[ $INITIAL_ID = $POSTUPDATE_ID ] && exit 0

npm run build