#!/bin/bash

echo "Starting"
echo "\"${REACT_APP_DFUSE_API_NETWORK}\""

# cat dfuse.yaml
# cat producer/config.ini

REACT_APP_DFUSE_API_NETWORK=${REACT_APP_DFUSE_API_NETWORK} dfuseeos start \
    --data-dir /data \
    --search-common-dfuse-events-action-name=dfuseiohooks:event \
    --search-common-dfuse-events-unrestricted=true \
    --common-chain-id df383d1cc33cbb9665538c604daac13706978566e17e5fd5f897eff68b88e1e4