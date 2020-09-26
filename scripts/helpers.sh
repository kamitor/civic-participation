#!/bin/bash

function start {
    ARG1=${1-}

    set +e
    docker volume create blockchain-data
    docker volume create mongo-data
    set -e

    echo "Starting dfuse and mongodb"
    cd "${PARENT_PATH}"
    docker-compose up -d

    if [ "${ARG1}" != "lean" ]; then
        echo "Starting react (front-end)"
        cd "${PARENT_PATH}/front-end"
        if [ "${ARG1}" == "prod" ]; then
            npm run-script start-prod 3>&1 2>&1 >> react.log &
        else
            npm start 3>&1 2>&1 >> react.log &
        fi

        echo "Starting node (back-end)"
        cd "${PARENT_PATH}/back-end"
        if [ "${ARG1}" == "prod" ]; then
            npm run-script start-prod 3>&1 2>&1 >> node.log &
        else
            npm start 3>&1 2>&1 >> node.log &
        fi
    fi
}

function stop {
    echo "Stopping blockchain and mongodb"
    cd "${PARENT_PATH}"
    docker-compose down

    echo "Stopping react and node"
    set +e
    pkill node
    set -e
}

function install {
    echo "Building dockerfiles"
    cd "${PARENT_PATH}"
    docker-compose build

    echo "Install back-end packages"
    cd "${PARENT_PATH}/back-end"
    npm install

    echo "Install front-end packages"
    cd "${PARENT_PATH}/front-end"
    npm install
}

function init {
    reset
    start

    echo "Initializing blockchain"
    cd "${PARENT_PATH}/blockchain"
    ./init_reset_eosio.sh ${1-}
}

function reset {
    stop

    set +e
    docker volume rm blockchain-data
    docker volume rm mongo-data
    set -e
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
