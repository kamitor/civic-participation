#!/bin/bash

# Ubuntu 18 machine

sudo apt update

# Docker and docker-compose
sudo apt install docker docker-compose -y

sudo usermod -aG docker ${USER}


# nvm with node 12.17.0 and npm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
# Close and open terminal again

nvm install 12.17.0

git clone https://github.com/Conscious-Cities/civic-participation.git
cd civic-participation