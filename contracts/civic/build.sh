#!/bin/bash

REACT_APP_NODE_ENV=development docker-compose run eosio-cdt eosio-cpp -abigen -I /var/repo/contracts/civic/include -R resource -contract civic -o /var/repo/contracts/civic/civic.wasm /var/repo/contracts/civic/src/civic.cpp