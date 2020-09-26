#!/bin/bash

function help {
    echo ""
    echo "Usage:"
    echo "    app.sh [commands]"
    echo ""
    echo "Commands:"
    echo "    install        - installs all containers and packages"
    echo "    init           - compiles contracts, starts and initalizes the blockchain"
    echo "    init fast      - starts and initializes the blockchain"
    echo "    start          - starts all services"
    echo "    start prod     - starts all services in production mode"
    echo "    start lean     - starts blockchain and mongo only - you need to run the front-end and back-end manually"
    echo "    stop           - stops services gracefully"
    echo "    restart        - stops and starts"
    echo "    reset          - resets all blockchain and mongodb data"
    echo "    logs [service] - shows log for service"
}

function printservices {
    echo ""
    echo "Services running"
    echo "http://localhost:3000 - React app"
    echo "http://localhost:4000 - Express middleware service"
    echo "http://localhost:8080 - Dfuse blockchain API"
    echo "http://localhost:8081 - Dfuse blockchain dashboard"
    echo "http://localhost:8888 - Nodeos blockchain API"
    echo ""
}

function printlogs {
    echo ""
    echo "Commands:"
    echo "    logs react     - tail logs for react (front-end)"
    echo "    logs node      - tail logs for node (back-end)"
    echo "    logs dfuse     - tail logs for dfuse (blockchain)"
    echo "    logs mongo     - tail logs for mongo (database)"
    
}