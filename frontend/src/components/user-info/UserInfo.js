import { Flex, Box, Spinner } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import RequestLoan from "./RequestLoan";
import PendingLoan from "./PendingLoan";
import ActiveLoan from "./ActiveLoan";
import Balance from "./Balance";
import { useDispatch, useSelector } from "react-redux";
import { addLoan, setLoans, deleteLoan, updateUserBalance, updateUserLoanStatus } from "../../state/actions";

function UserInfo({ contract }) {
  // state variables
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.member.currentUser)
  const [loading, setLoading] = useState(true);

  // fetch data for component
  useEffect(() => {
    // function to fetch loan data from backend on load
    async function fetchLoanData() {
      try {
        const result = await contract.methods.getAllOpenLoans().call();
        dispatch(setLoans(result));
      } catch (error) {
        console.error("Error fetching loan data:", error);
      }
    }
    setLoading(true);
    fetchLoanData();
    setLoading(false);
    // eslint-disable-next-line
  }, []);

  // function called from child component RequestLoan.js
  // requests a loan by interacting with backend and re-fetches data
  const onRequestLoan = async (amount, interest, dueDate, description) => {
    try {
      contract.methods.requestLoan(amount, interest, new Date(dueDate).getTime(), description).call().then((l) => {
        dispatch(addLoan(l));
        dispatch(updateUserLoanStatus(l.id, "PENDING"));
      })
    } catch (e) {
      console.error("Error requesting loan:", e);
    }
  }

  const onCancelLoan = async () => {

    try {
      // TODO: Fix this backend call (its causing errors idk)
      // contract.methods.cancelLoan(loanId).call();
      dispatch(deleteLoan(currentUser.loanid));
      dispatch(updateUserLoanStatus(0, "NONE"));
    } catch (e) {
      console.error("Error canceling loan:", e);
    }
  }

  const onFillLoan = async (loanAmount) => {
    try {
      // update status of loan to Active
      dispatch(updateUserLoanStatus(currentUser.loanid, "ACTIVE"));
      //give the user balance
      handleDeposit(loanAmount)
    } catch (e) {
      console.error("Error filling loan:", e);
    }
  }

  const onPayNow = async (amount_due) => {
    try {
      // check if they have balance to repay
      if (currentUser.balance > amount_due){
        const paidLoanID = currentUser.loanid
        // update status of loan to NONE
        dispatch(updateUserLoanStatus(-1, "NONE"));
        //give the user balance
        handleWithdraw(amount_due)
        dispatch(deleteLoan(paidLoanID))
      }
    } catch (e) {
      console.error("Error filling loan:", e);
    }
  }

  // defines which loan component should be displayed based on fetched data
  // based on state.member.currentUser.loanStatus
  function renderLoanComponent() {
    if (loading) {
      return <Spinner />;
    };
    if (currentUser) {
      if (currentUser.loanStatus === "PENDING") {
        return <PendingLoan
            onFilled={onFillLoan}
            onCancel={onCancelLoan}
         />;
      } else if (currentUser.loanStatus === "ACTIVE") {
        return (
          <ActiveLoan
              amountDue={`$${parseFloat(currentUser.amount * (currentUser.interest / 100 + 1)).toFixed(2)}`} // Format as a dollar value with 2 decimal places
              interest={`${currentUser.interest}%`} // Make sure you have an 'interest' field or calculate it
              dueDate={currentUser.dueDate}
              onPayNow={onPayNow}
          />
      );
      };
    };
    return <RequestLoan onRequestLoan={onRequestLoan} />;
  };

  const handleDeposit = (amount) => {
    // Ensure both values are treated as numbers
    const numericAmount = parseFloat(amount);
    const numericBalance = parseFloat(currentUser.balance);

    // Logic to update balance with the deposit amount
    const updatedBalance = numericBalance + numericAmount;
    console.log(`Deposit Amount: ${numericAmount}, New Balance: ${updatedBalance}`);
    dispatch(updateUserBalance(updatedBalance));
};

const handleWithdraw = (amount) => {
    // Ensure both values are treated as numbers
    const numericAmount = parseFloat(amount);
    const numericBalance = parseFloat(currentUser.balance);

    // Logic to update balance with the withdrawal amount
    const updatedBalance = numericBalance - numericAmount;
    console.log(`Withdraw Amount: ${numericAmount}, New Balance: ${updatedBalance}`);
    dispatch(updateUserBalance(updatedBalance));
};

  return (
    <Flex direction="row" align="stretch" wrap="wrap">
      <Box flex="2" minW={{ base: "100%", md: "66%" }} p={3}>
        {renderLoanComponent()}
      </Box>
      <Box flex="1" minW={{ base: "100%", md: "33%" }} p={3}>
        <Balance  
        balance={currentUser?.balance}
        onDeposit={handleDeposit}
        onWithdraw={handleWithdraw}
        />
        
      </Box>
    </Flex>
  );
}

export default UserInfo;