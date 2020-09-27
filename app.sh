#!/bin/bash

ARG1=$1
ARG2=$2

# Make sure working dir is same as this dir, so that script can be excuted from another working directory
PARENT_PATH=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

set -u ## exit the script if you try to use an uninitialised variable
set -e ## exit the script if any statement returns a non-true return value

. scripts/helpers.sh
. scripts/printers.sh

if [ -z "${ARG1}" ]; then
    help
elif [ "${ARG1}" == "install" ]; then
    stop
    install
elif [ "${ARG1}" == "init" ]; then
    if [ "${ARG2}" == "fast" ]; then
        init "superfast"
    else
        init
    fi
    printservices
elif [ "${ARG1}" == "start" ]; then
    stop
    start "${ARG2}"
    printservices
elif [ "${ARG1}" == "stop" ]; then
    stop
elif [ "${ARG1}" == "reset" ]; then
    reset
elif [ "${ARG1}" == "logs" ]; then
    logs "${ARG2}"
else
    help
fi