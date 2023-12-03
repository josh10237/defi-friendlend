// WEB3 LIBRARIES
const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

// Connect to the Ethereum node
const web3 = new Web3(new Web3.providers.HttpProvider("https://sepolia.infura.io/v3/782dad6b6b984171a70dec97668ad773"))
// contract address of deployed contract
const contractAddress = "0x3A8e4860be16D75453C87368a43dfD28eE3F23C3"
// Read the ABI and address from the compiled contract artifacts
const contractABI = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'build/contracts/FriendLend.json'), 'utf8'));

// Create a contract instance
const contract = new web3.eth.Contract(contractABI.abi, contractAddress);
const joey_add = "0x69294144bC1445C0E92a4ad3C572249841091544"
const dylan_add = "0xcaCCC3933801B308F6261B941EA2C68c93730849"
// Task 1: Retrieve data from the smart contract
async function getInfo() {

  const data = await contract.methods.groupName().call();
  console.log('GroupName', data);
  owner = await contract.methods.owner().call()
  console.log("owner", owner)
  mc = await contract.methods.memberCount().call()
  console.log("memberCount", mc.toString())
  
  console.log("joey struct", await contract.methods.members(joey_add).call())
  console.log("dylan struct", await contract.methods.members(dylan_add).call())

}

const dylan_PK = '3b5c8eb5d0d5b2e3f86805aa2a4e3f2a4d939e88791c238984237263a7ebe3d3'; // replace with your account's private key
const joey_PK = "beab5fcdce3459b43807e337f3a630f0fa815630a30e951f580f4deeb9c5cdb0"

async function abi(methodName, contractAddress, sender, PK, value, ...methodArgs) {
    return new Promise(async (resolve, reject) => {

    const data = contract.methods[methodName](...methodArgs).encodeABI();

    const tx = {
        from: sender,
        to: contractAddress,
        gas: 2000000,
        data: data,
     };
     if (value) {
        tx.value = web3.utils.toWei(value.toString(), 'ether');
     }
     web3.eth.accounts.signTransaction(tx, PK)
        .then((signedTx) => {
            if (!signedTx || !signedTx.rawTransaction) {
                reject('Failed to sign the transaction.');
                return;
            }

            web3.eth.sendSignedTransaction(signedTx.rawTransaction)
                .on('receipt', (receipt) => {
                    console.log(receipt);
                    resolve();
                })
                .on('error', (error) => {
                    console.error('Transaction failed:', error);
                    reject(error);
                });
        })
        .catch((error) => {
            console.error('Error signing the transaction:', error.message);
            reject(error);
        });
    });
}

async function sendTransactions() {
    try {
        await abi("depositFunds", contractAddress, dylan_add, dylan_PK, 0.069)
        console.log("deposit done\n")
        // await abi("proposeInvite", contractAddress, joey_add, joey_PK, null, dylan_add)
        // console.log("proposed invite")
        // await abi("voteOnPendingPerson", contractAddress, joey_add, joey_PK, null, dylan_add, true)
        // console.log("voted on dylan", test)
        //await abi("join", contractAddress, dylan_add, dylan_PK, null, "dylan")
        //console.log("dylan joined")
        abi("requestLoan", contractAddress, dylan_add, dylan_PK, null, 4000000, 3, 5, "i am also broke lol")
        console.log("requested")
    }
    catch (error) {//
        console.error('ABORTING LLLLLLLLLL', error);
    }
    //await abi("depositFunds", contractAddress, my_add, privateKey, 0.0420)

}

//sendTransactions()
getInfo()