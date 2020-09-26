#!/bin/bash

function start {
    cd "${PARENT_PATH}"
    docker-compose up -d

    cd "${PARENT_PATH}/front-end"
    npm start >> react.log &

    cd "${PARENT_PATH}/back-end"
    npm start >> node.log &

    upprint
}

function stop {
    cd "${PARENT_PATH}"
    docker-compose down
    pkill node
}

function install {
    cd "${PARENT_PATH}"
    docker-compose build

    cd "${PARENT_PATH}/back-end"
    npm install

    cd "${PARENT_PATH}/front-end"
    npm install

    echo ""
    echo "Dockerfiles built"
    echo "npm packages installed"
    echo "You can run './app.sh init fast' next time (unless docker or npm packages are changed)"
    echo ""
}

function init {
    SUPERFAST=${1-}
    reset
    startdocker "docker"

    cd "${PARENT_PATH}/blockchain"
    ./init_reset_eosio.sh $SUPERFAST

    upprint
}

function reset {
    stop
    echo "This will reset the blockchain and all databases!!! (sudo required)"
    read -p "Do you want to continue (y/n)? " CHOICE
    if [ "$CHOICE" == 'y' ]; then
        if [ -d "${PARENT_PATH}/temp" ]
        then
            sudo rm "${PARENT_PATH}/temp" -R
        fi
    else
        exit 1
    fi
}
