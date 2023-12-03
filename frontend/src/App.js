import TopBar from './components/TopBar';
import './App.css';
import UserInfo from './components/user-info/UserInfo';
import OpenLoans from './components/open-loans/OpenLoans';
import MemberList from './components/member-list/MemberList';

// WEB3 LIBRARIES
import Web3 from 'web3';
import { FriendLend } from './abi/abi';

// access wallet inside of dapp
const web3 = new Web3(new Web3.providers.HttpProvider("https://sepolia.infura.io/v3/782dad6b6b984171a70dec97668ad773"))
// contract address of deployed contract
const contractAddress = "0x7AF84B9b65F5E06B8a3DA649aA2E54DdF14834c2"
const friendLendContract = new web3.eth.Contract(FriendLend, contractAddress)

// script for all abi calls
const abi = async (methodName, sender, PK, value, ...methodArgs) => {
  console.log("Calling ABI for method", methodName)
  return new Promise(async (resolve, reject) => {

  const data = friendLendContract.methods[methodName](...methodArgs).encodeABI();
  console.log("Function ABI Data", data)

  const tx = {
          from: sender,
          to: contractAddress,
          gas: 200000000,
          gasPrice: await web3.eth.getGasPrice(),
          data: data,
      };
      if (value) {
          tx.value = web3.utils.toWei(value.toString(), 'ether');
      }
      web3.eth.accounts.signTransaction(tx, PK)
          .then((signedTx) => {
            console.log("TRANSACTION SIGNED", signedTx)
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

function App() {
    return (
      <div>
        <TopBar contract={friendLendContract} abi={abi} />
        <UserInfo contract={friendLendContract} abi={abi} />
        <OpenLoans contract={friendLendContract} abi={abi} />
        <MemberList contract={friendLendContract} abi={abi} />
      </div>
    );
}

export default App;
