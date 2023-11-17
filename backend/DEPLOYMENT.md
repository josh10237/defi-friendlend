# Things to do to deploy contract after changes

#### cd into backend folder
#### run `truffle compile`
#### fix any errors
#### run `truffle migrate --network sepolia`
#### copy "contract address" from the migration logs
#### paste into contractAddress variable in App.js
#### copy abi array from FriendLend.json
#### paste array in abi frontend file
#### cd to frontend folder and run `npm start`
#### ALL DONE!