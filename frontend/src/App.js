import TopBar from './components/TopBar';
import './App.css';
import UserInfo from './components/user-info/UserInfo';
import OpenLoans from './components/open-loans/OpenLoans';
import MemberList from './components/member-list/MemberList';

import Web3 from 'web3';
import { FriendLend } from './abi/abi';
import { useEffect, useState } from 'react';

// access wallet inside of dapp
const web3 = new Web3(new Web3.providers.HttpProvider("https://sepolia.infura.io/v3/782dad6b6b984171a70dec97668ad773"))
// contract address of deployed contract
const contractAdress = "0x0Ce878c30DD201D50Db6588F55e93995aAE814E9"
const friendLendContract = new web3.eth.Contract(FriendLend, contractAdress)

function App() {
  const [loading, setLoading] = useState(true)

  /*
  This section is used strictly for testing purposes.
  It console logs data retrieval to ensure proper functioning in the backend. 
  */
  useEffect(() => {
    async function checkBackendRetrievals() {
      console.log("Testing Backend Retrievals in App.js")
      // retrieve and log member list
      try {
        const members = await friendLendContract.methods.getAllConfirmedMembers().call()
        console.log("Members Retrieved in Testing:", members)
      } catch (e) {
        console.error("Error retrieving Member List:", e)
      }
      // retrieve and log open loan list
      try {
        const loans = await friendLendContract.methods.getAllOpenLoans().call()
        console.log("Loans Retrieved in Testing:", loans)
      } catch (e) {
        console.error("Error retrieving Loan List:", e)
      }
    }
    setLoading(true)
    checkBackendRetrievals()
    setLoading(false)
    // eslint-disable-next-line
  }, [])

  // if testing, return a filler screen
  if (loading) {
    return (
      <div>
        <h1>TESTING BACKEND RETRIEVAL FUNCTIONS</h1>
      </div>
    )
  } else {
    return (
      <div>
        <TopBar contract={friendLendContract} />
        <UserInfo contract={friendLendContract} />
        <OpenLoans contract={friendLendContract} />
        <MemberList contract={friendLendContract} />
      </div>
    );
  }
}

export default App;
