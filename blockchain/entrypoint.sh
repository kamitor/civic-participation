#!/bin/bash

# cat dfuse.yaml
# cat producer/config.ini

set -e

if [ -z "${EOSQ_ENDPOINT_URL}" ]; then
    echo "EOSQ_ENDPOINT_URL not found"
    exit 1
fi

set -x
dfuseeos start \
    --data-dir /data \
    --search-common-dfuse-events-action-name=dfuseiohooks:event \
    --search-common-dfuse-events-unrestricted=true \
    --common-chain-id df383d1cc33cbb9665538c604daac13706978566e17e5fd5f897eff68b88e1e4 \
    --eosq-api-endpoint-url=${EOSQ_ENDPOINT_URL}