// WEB3 LIBRARIES
const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

// Connect to the Ethereum node
const web3 = new Web3(new Web3.providers.HttpProvider("https://sepolia.infura.io/v3/782dad6b6b984171a70dec97668ad773"))
//const web3 = window.ethereum;
const pk = "3b5c8eb5d0d5b2e3f86805aa2a4e3f2a4d939e88791c238984237263a7ebe3d3"
// contract address of deployed contract
const contractAddress = "0x7AF84B9b65F5E06B8a3DA649aA2E54DdF14834c2"
// Read the ABI and address from the compiled contract artifacts
const contractABI = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'build/contracts/FriendLend.json'), 'utf8'));

// Create a contract instance
const contract = new web3.eth.Contract(contractABI.abi, contractAddress);
const other_add = "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef"
const joey_add = "0x69294144bC1445C0E92a4ad3C572249841091544"
const my_add = "0xcaCCC3933801B308F6261B941EA2C68c93730849"
// Task 1: Retrieve data from the smart contract
async function main() {
    bal = await web3.eth.getBalance(my_add)
    console.log(bal)
  const accounts = await web3.eth.getAccounts();
  const data = await contract.methods.groupName().call();
  console.log('GroupName', data);
  owner = await contract.methods.owner().call()
  console.log("owner", owner)
  mc = await contract.methods.memberCount().call()
  console.log("memberCount", mc.toString())
  
  console.log("joey struct", await contract.methods.members(joey_add).call())
  
  joey_can_join = await contract.methods.canJoin().call({from: joey_add})
  console.log('joey can join', joey_can_join)
  //await contract.methods.proposeInvite(dylan_add).send()
  //const allMembers = await contract.methods.votes(owner, dylan_add).call()
  //console.log("allMembers", allMembers)
  //const loanId = await contract.methods.currLoanId().call();
  //console.log('loanid', loanId)
  //loan = await contract.methods.loans(0).call()
  //console.log("loan", loan)
}

// Execute the tasks
main();

const privateKey = '3b5c8eb5d0d5b2e3f86805aa2a4e3f2a4d939e88791c238984237263a7ebe3d3'; // replace with your account's private key
const joey_PK = "beab5fcdce3459b43807e337f3a630f0fa815630a30e951f580f4deeb9c5cdb0"
// const data1 = contract.methods.proposeInvite(other_add).encodeABI(); // replace 'setValue' and '10' with your method's name and arguments
const data2 = contract.methods.join("dool").encodeABI(); // replace 'setValue' and '10' with your method's name and arguments

const tx = {
   from: joey_add,
   to: contractAddress,
   gas: 2000000,
   data: data2,
   //value: web3.utils.toWei('0.069', 'ether')
};

web3.eth.accounts.signTransaction(tx, joey_PK)
   .then((signedTx) => {
      if (!signedTx || !signedTx.rawTransaction) {
         throw new Error('Failed to sign the transaction.');
      }

      web3.eth.sendSignedTransaction(signedTx.rawTransaction)
         .on('receipt', console.log)
         .on('error', (error) => {
            console.error('Transaction failed:', error);
         });
   })
   .catch((error) => {
      console.error('Error signing the transaction:', error.message);
   });
console.log('success')