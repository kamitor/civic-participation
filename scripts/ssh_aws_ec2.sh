#!/bin/bash

chmod 400 ./keys/ec2.pem
ssh -i ./keys/ec2.pem ubuntu@ec2-3-8-196-95.eu-west-2.compute.amazonaws.com


# cd civic-participation/
# ./app.sh stop
# git pull
# ./app.sh install
# ./app.sh start prod    OR
# ./app.sh init prod            (if you need to reset blockchain or recompile contracts)
# check services run correctly with:
# ./app.sh logs [service]