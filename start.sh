#!/bin/sh
set -eo pipefail

NODE_ENV=production
NPM_CONFIG_LOGLEVEL=warn
BUILD_ID=$CI_COMMIT_SHA
API_URL=http://3.211.248.180/api
# we need to do this at container runtime because
# the variables are replaced in the optimized build

npm run build
npm run start
