#!/bin/bash

# Load the variables in .env file 
source .env

forge script script/DeployMantle.s.sol:MantleDeployScript --rpc-url $MANTLE_TESTNET_RPC --private-key $PRIVATE_KEY --broadcast --verify  -vvvv --legacy

forge script script/Deploy.s.sol:DeployScript --rpc-url $MANTLE_TESTNET_RPC --private-key $PRIVATE_KEY --broadcast --verify  -vvvv --legacy

forge script script/Deploy.s.sol:DeployScript --rpc-url $TAIKO_TESTNET_RPC --private-key $PRIVATE_KEY --broadcast --verify -vvvv --legacy
