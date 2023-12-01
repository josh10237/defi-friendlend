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
const contractAdress = "0xAEAF3d67d695C94c42B5416e096710720b5A1Bf3"
const friendLendContract = new web3.eth.Contract(FriendLend, contractAdress)

function App() {
    return (
      <div>
        <TopBar contract={friendLendContract} />
        <UserInfo contract={friendLendContract} />
        <OpenLoans contract={friendLendContract} />
        <MemberList contract={friendLendContract} />
      </div>
    );
}

export default App;
