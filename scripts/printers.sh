#!/bin/bash

function help {
    echo ""
    echo "Usage:"
    echo "    app.sh [commands]"
    echo ""
    echo "Commands:"
    echo "    install        - installs all containers and packages"
    echo "    init           - compiles contracts, starts services and initalizes the blockchain"
    echo "    init fast - starts services and initializes the blockchain"
    echo "    start          - starts application components"
    echo "    start lean     - starts application execution on production server"
    echo "    start prod     - starts application execution on production server"
    echo "    stop           - stops application components gracefully"
    echo "    restart        - stops and starts"
    echo "    reset          - resets all application data including blockchain history and database"
    echo "    logs [service] - shows log for service"
}

function upprint {
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