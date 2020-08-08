#!/bin/bash

HOST="api.env.io"
USER="deployer" 
DIR="/opt/envio/api"

print() {
 echo -e "\e[1m\e[32m$1\e[0m"
}

# Build artifact
print "[1/3] Building artifact..." &&
yarn package &&
# Copy to remote
print "[2/3] Upload artifact..." &&
scp -C build/main $USER@$HOST:$DIR/new &&
# Execute deploy new service
print "[3/3] Execute new version..." &&
ssh $USER@$HOST "$DIR/deploy.sh" 