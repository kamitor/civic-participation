#!/bin/bash

function help {
    echo ""
    echo "Usage:"
    echo "    app.sh [commands]"
    echo ""
    echo "Commands:"
    echo "    init           - installs all containers and packages, starts services, compiles contracts and initalizes the blockchain"
    echo "    init fast      - starts services, compiles contracts and initalizes the blockchain"
    echo "    init superfast - starts services and initializes the blockchain"
    echo "    install        - installs all containers and packages"
    echo "    up             - starts application components"
    echo "    up prod        - starts application execution on production server"
    echo "    down           - stops application components gracefully"
    echo "    reset          - resets all application data including blockchain history and database"
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
    echo "For logs check the temp/* directory for *.log file"
    echo "Also call docker-compose logs"
}

function printlogs {
    echo ""
    echo "Commands:"
    echo "    logs react     - tail logs for react"
    
}