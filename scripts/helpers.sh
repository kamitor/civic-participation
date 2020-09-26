#!/bin/bash

function start {
    ARG1=$1

    set +e
    docker volume create blockchain-data
    set -e

    cd "${PARENT_PATH}"
    docker-compose up -d

    if [ "${ARG1}" != "lean" ]; then
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

    docker volume rm blockchain-data
}

function logs {
    SERVICE=${1}

    if [ "${SERVICE}" == "react" ]; then
        tail -f -n 20 "${PARENT_PATH}/front-end/react.log"
    elif [ "${SERVICE}" == "node" ]; then
        tail -f -n 20 "${PARENT_PATH}/back-end/node.log"
    elif [ "${SERVICE}" == "dfuse" ]; then
        docker-compose logs dfuse
    elif [ "${SERVICE}" == "dfuse" ]; then
        docker-compose logs mongo
    else
        printlogs
    fi
}
