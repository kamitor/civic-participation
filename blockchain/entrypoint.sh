#!/bin/bash

# cat dfuse.yaml
# cat producer/config.ini

EOSQ_ENDPOINT_URL="localhost:8080"
#EOSQ_ENDPOINT_URL="blockchain-civic.conscious-cities.com"

set -x
dfuseeos start \
    --data-dir /data \
    --search-common-dfuse-events-action-name=dfuseiohooks:event \
    --search-common-dfuse-events-unrestricted=true \
    --common-chain-id df383d1cc33cbb9665538c604daac13706978566e17e5fd5f897eff68b88e1e4 \
    --eosq-api-endpoint-url=${EOSQ_ENDPOINT_URL}