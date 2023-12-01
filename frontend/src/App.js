import TopBar from './components/TopBar';
import './App.css';
import UserInfo from './components/user-info/UserInfo';
import OpenLoans from './components/open-loans/OpenLoans';
import MemberList from './components/member-list/MemberList';

// WEB3 LIBRARIES
import Web3 from 'web3';
import { FriendLend } from './abi/abi';
import { useEffect } from 'react';

// REDUX STATE ACTION TYPES
import { setCurrentUser } from './state/actions';
import { useDispatch, useSelector } from 'react-redux';

// access wallet inside of dapp
const web3 = new Web3(new Web3.providers.HttpProvider("https://sepolia.infura.io/v3/782dad6b6b984171a70dec97668ad773"))
// contract address of deployed contract
const contractAdress = "0xF86e5CE91aAAbE8f29162f8b4Ed84CA9573e49b1"
const friendLendContract = new web3.eth.Contract(FriendLend, contractAdress)



function App() {

  const currentUser = useSelector(state => state.member.currentUser)
  const members = useSelector(state => state.member.members)
  const dispatch = useDispatch()

  useEffect(() => {
    // setting current user to first member in list; need better solution
    dispatch(setCurrentUser(members[0]))
    // eslint-disable-next-line
  }, [members])
  console.log("current user:", currentUser)

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
