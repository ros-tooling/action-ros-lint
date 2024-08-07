#!/usr/bin/env bash
set -euxo pipefail

mkdir dist
NPM_CONFIG_PREFIX=dist

npm install -g codecov

npm ci
npm run build
npm test

# Upload code coverage result to Codecov
codecov -f ./coverage/coverage-final.json \
    --disable=detect --commit="${GITHUB_SHA}" \
    --branch="${GITHUB_REF#refs/heads/}"
