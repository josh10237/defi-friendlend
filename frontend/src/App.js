import TopBar from './components/TopBar';
import './App.css';
import UserInfo from './components/user-info/UserInfo';
import OpenLoans from './components/open-loans/OpenLoans';
import MemberList from './components/member-list/MemberList';

function App() {
  return (
    <div>
      <TopBar />
      <UserInfo />
      <OpenLoans />
      <MemberList />
    </div>
  );
}

export default App;
