#!/bin/bash
cd ~/apps/labrujulaaudiovisual_opalstack_com_http/production/
INITIAL_ID=$(git rev-parse HEAD)
git add -A
git commit -m "manual changes"
git pull ssh main
git push ssh main
git pull ssh main
POSTUPDATE_ID=$(git rev-parse HEAD)

# [ $INITIAL_ID = $POSTUPDATE_ID ] && exit 0

npm run build