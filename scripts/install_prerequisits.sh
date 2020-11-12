#!/bin/bash

# Ubuntu 18 machine

sudo apt update

# Docker and docker-compose
sudo apt install docker docker-compose -y
# Reboot
sudo usermod -aG docker ${USER}
# Roboot

# nvm with node and npm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
# Close and open terminal again
nvm install v14.15.0

npm install -g serve

git clone https://github.com/Conscious-Cities/civic-participation.git
cd civic-participation