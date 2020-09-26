#!/bin/bash

function start {
    ARG1=$1

    cd "${PARENT_PATH}"
    docker-compose up -d

    cd "${PARENT_PATH}/front-end"
    if [ "${ARG1}" == "prod" ]; then
        npm start-prod >> react.log &
    else
        npm start >> react.log &
    fi

    cd "${PARENT_PATH}/back-end"
    if [ "${ARG1}" == "prod" ]; then
        npm start-prod >> node.log &
    else
        npm start >> node.log &
    fi

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
    SUPERFAST=${1}
    reset
    start

    cd "${PARENT_PATH}/blockchain"
    ./init_reset_eosio.sh $SUPERFAST

    upprint
}

function reset {
    stop
}
