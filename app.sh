#!/bin/bash

ARG1=$1
ARG2=$2

# Make sure working dir is same as this dir, so that script can be excuted from another working directory
PARENT_PATH=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

set -o nounset   ## set -u : exit the script if you try to use an uninitialised variable
set -o errexit   ## set -e : exit the script if any statement returns a non-true return value

. scripts/helpers.sh
. scripts/printers.sh

if [ -z "$ARG1" ]; then
    help
elif [ "$ARG1" == "start" ]; then
    start
elif [ "$ARG1" == "restart" ]; then
    stop
    start
elif [ "$ARG1" == "stop" ]; then
    stop
elif [ "$ARG1" == "init" ]; then
    if [ "$ARG2" == "fast" ]; then
        init
    elif [ "$ARG2" == "superfast" ]; then
        init "superfast"
    else
        stop
        install
        init
    fi
elif [ "$ARG1" == "reset" ]; then
    reset
elif [ "$ARG1" == "install" ]; then
    stop
    install
else
    help
fi