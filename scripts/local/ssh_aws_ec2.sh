#!/bin/bash

# Make sure working dir is same as this dir, so that script can be excuted from another working directory
PARENT_PATH=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$PARENT_PATH"

source ../../config.sh

SSH_LOCATION="ubuntu@"$SERVER_DOMAIN
chmod 400 ../keys/ubuntu18-vm.pem
ssh -i ../keys/ubuntu18-vm.pem $SSH_LOCATION