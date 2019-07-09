#!/bin/sh
set -eo pipefail

NODE_ENV=production
NPM_CONFIG_LOGLEVEL=warn
BUILD_ID=$CI_COMMIT_SHA
# we need to do this at container runtime because
# the variables are replaced in the optimized build

npm run build
npm run start
