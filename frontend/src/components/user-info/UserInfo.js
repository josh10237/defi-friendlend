import { Flex, Box, Spinner } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import RequestLoan from "./RequestLoan";
import PendingLoan from "./PendingLoan";
import ActiveLoan from "./ActiveLoan";
import Balance from "./Balance";
import { useDispatch, useSelector } from "react-redux";
import { addLoan, setLoans, updateUserBalance } from "../../state/actions";

function UserInfo({ contract }) {
  // state variables
  const dispatch = useDispatch();
  const loanData = useSelector((state) => state.loan.loans);
  const currentUser = useSelector((state) => state.member.currentUser)
  const [loading, setLoading] = useState(true);
  // const [balance, setBalance] = useState(null); // You would fetch this from your smart contract

//   const [thisUser, setCurrentUser] = useState({
//     balance: currentUser?.balance ?? 25,
// });

//   const [balance, setBalance] = useState(13)
  

  // TODO: fetch user balance function
  function fetchUserBalance() {
    console.log("Fetching User Balance")
    // setBalance(currentUser?.balance)
    // console.log("current bal" + currentUser)
  }

  // fetch data for component
  useEffect(() => {
    // function to fetch loan data from backend on load
    async function fetchLoanData() {
      try {
        const result = await contract.methods.getAllOpenLoans().call();
        dispatch(setLoans(result));
        console.log("Result after fetching loan data:", loanData);
      } catch (error) {
        console.error("Error fetching loan data:", error);
      }
    }
    setLoading(true);
    fetchLoanData();
    fetchUserBalance();
    setLoading(false);
    // eslint-disable-next-line
  }, []);

  // function called from child component RequestLoan.js
  // requests a loan by interacting with backend and re-fetches data
  const onRequestLoan = async (amount, interest, dueDate, description) => {
    console.log(amount)
    console.log(interest)
    console.log(dueDate)
    console.log(description)
    try {
      contract.methods.requestLoan(amount, interest, new Date(dueDate).getTime(), description).call().then((l) => {
        dispatch(addLoan(l));
        console.log("loan request complete:", loanData);
      })
    } catch (e) {
      console.error("Error requesting loan:", e);
    }
  }

  console.log("Open Loans Redux Data: ", loanData)

  // defines which loan component should be displayed based on fetched data
  function renderLoanComponent() {
    if (loading) {
      return <Spinner />;
    };
    if (loanData) {
      if (loanData.isPending && !loanData.isFulfilled) {
        return <PendingLoan />;
      } else if (loanData.isFulfilled) {
        return (
          <ActiveLoan
            amountDue={loanData.amount}
            interest={loanData.interest} // Make sure you have an 'interest' field or calculate it
            dueDate={new Date(loanData.dueDate * 1000).toLocaleDateString()}
            // Define the onPayNow handler
          />
        );
      };
    };
    return <RequestLoan onRequestLoan={onRequestLoan} />;
  };

    const handleDeposit = (amount) => {
      // Logic to update balance with the deposit amount
      const updatedBalance = currentUser.balance + amount;
      console.log(`Deposit Amount: ${amount}, New Balance: ${updatedBalance}`);
      dispatch(updateUserBalance(updatedBalance));
    };

  const handleWithdraw = (amount) => {
      // Logic to update balance with the withdrawal amount
      const updatedBalance = currentUser.balance - amount;
      console.log(`Withdraw Amount: ${amount}, New Balance: ${updatedBalance}`);
      dispatch(updateUserBalance(updatedBalance));
    };

  return (
    <Flex direction="row" align="stretch" wrap="wrap">
      <Box flex="2" minW={{ base: "100%", md: "66%" }} p={3}>
        {renderLoanComponent()}
      </Box>
      <Box flex="1" minW={{ base: "100%", md: "33%" }} p={3}>
        <Balance  balance={currentUser?.balance} 
        onDeposit={handleDeposit}
        onWithdraw={handleWithdraw}
        />
        
      </Box>
    </Flex>
  );
}

export default UserInfo;