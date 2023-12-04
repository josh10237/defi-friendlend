import { Flex, Box, Spinner, Center, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import RequestLoan from "./RequestLoan";
import PendingLoan from "./PendingLoan";
import ActiveLoan from "./ActiveLoan";
import Balance from "./Balance";
import { useDispatch, useSelector } from "react-redux";
import { setLoans, deleteLoan, updateUserBalance, updateUserLoanStatus } from "../../state/actions";

function UserInfo({ contract, abi, web3 }) {
  // state variables
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.member.currentUser)
  const [loading, setLoading] = useState(false);

  // function called from child component RequestLoan.js
  // requests a loan by interacting with backend and re-fetches data
  const onRequestLoan = async (amount, interest, dueDate, description) => {
    try {
      console.log("requesting loan", amount, interest, dueDate, description)
      console.log(currentUser)
      setLoading(true)
      await abi(
        "requestLoan", 
        currentUser.memberAddress, 
        "3b5c8eb5d0d5b2e3f86805aa2a4e3f2a4d939e88791c238984237263a7ebe3d3", 
        null, 
        amount, interest, new Date(dueDate).getTime(), description).then(async (l) => {
        console.log("dispatching to redux")
        const loans = await contract.methods.getAllOpenLoans().call()
        const memberBE = await contract.methods.members(currentUser.memberAddress).call()
        dispatch(setLoans(loans));
        dispatch(updateUserLoanStatus(memberBE.loanid, "PENDING"));
      })
    } catch (e) {
      console.error("Error requesting loan:", e);
    }
    setLoading(false)
  }

  const onCancelLoan = async () => {
    setLoading(true)
    try {
      await abi(
        "cancelLoan", 
        currentUser.memberAddress, 
        "3b5c8eb5d0d5b2e3f86805aa2a4e3f2a4d939e88791c238984237263a7ebe3d3", 
        null, 
        currentUser.loanid).then(() => {
          dispatch(deleteLoan(currentUser.loanid));
          dispatch(updateUserLoanStatus(0, "NONE"));
          console.log("loan cancelled")
        })
    } catch (e) {
      console.error("Error canceling loan:", e);
    }
    setLoading(false)

  }

  const onFillLoan = async (loanAmount) => {
    try {
      // update status of loan to Active
      dispatch(updateUserLoanStatus(currentUser.loanid, "ACTIVE"));
      //give the user balance
      // Ensure both values are treated as numbers
      const numericAmount = parseFloat(loanAmount);
      const numericBalance = parseFloat(currentUser.balance);

      // Logic to update balance amount
      const updatedBalance = numericBalance + numericAmount;
      console.log(`Deposit Amount: ${numericAmount}, New Balance: ${updatedBalance}`);
      dispatch(updateUserBalance(updatedBalance));
    } catch (e) {
      console.error("Error filling loan:", e);
    }
  }

  const onPayNow = async (amount_due) => {
    setLoading(true)
    try {
      await abi(
        "payLoan", 
        currentUser.memberAddress, 
        "3b5c8eb5d0d5b2e3f86805aa2a4e3f2a4d939e88791c238984237263a7ebe3d3", 
        null, 
        currentUser.loanid).then(() => {
          // check if they have balance to repay
          if (currentUser.balance > amount_due){
            const paidLoanID = currentUser.loanid
            // update status of loan to NONE
            dispatch(updateUserLoanStatus(-1, "NONE"));
            //give the user balance
            const numericAmount = parseFloat(amount_due);
            const numericBalance = parseFloat(currentUser.balance);

            // Logic to update balance with the withdrawal amount
            const updatedBalance = numericBalance - numericAmount;
            console.log(`Withdraw Amount: ${numericAmount}, New Balance: ${updatedBalance}`);
            dispatch(updateUserBalance(updatedBalance));
            dispatch(deleteLoan(paidLoanID))
          }
        })
    } catch (e) {
      console.error("Error filling loan:", e);
    }
    setLoading(false)
  }

  // defines which loan component should be displayed based on fetched data
  // based on state.member.currentUser.loanStatus
  function renderLoanComponent() {
    if (loading) {
      return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={6} m={6}>
          <Center flexDirection={'column'}>
            <Spinner size={'xl'} m={'50px'} />
            <Text>Processing your Request...</Text>
          </Center>
        </Box>
      );
    };
    if (currentUser) {
      if (currentUser.loanStatus === "PENDING") {
        return <PendingLoan
            onFilled={onFillLoan}
            onCancel={onCancelLoan}
            abi={abi}
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

  const handleDeposit = async (amount) => {
    // Ensure both values are treated as numbers
    const numericAmount = parseFloat(amount) / (10**18);
    const numericBalance = parseFloat(currentUser.balance);

    await abi(
      "depositFunds", 
      currentUser.memberAddress, 
      "3b5c8eb5d0d5b2e3f86805aa2a4e3f2a4d939e88791c238984237263a7ebe3d3", 
      numericAmount).then(() => {
        // Logic to update balance with the deposit amount
        const updatedBalance = numericBalance + numericAmount * (10**18);
        console.log(`Deposit Amount: ${numericAmount}, New Balance: ${updatedBalance}`);
        dispatch(updateUserBalance(updatedBalance));
      })
  };

const handleWithdraw = async (amount) => {
    // Ensure both values are treated as numbers
    const numericAmount = parseFloat(amount);
    const numericBalance = parseFloat(currentUser.balance);
    try {
      await abi(
        "withdrawFunds",
        currentUser.memberAddress, 
        "3b5c8eb5d0d5b2e3f86805aa2a4e3f2a4d939e88791c238984237263a7ebe3d3", 
        null,
        numericAmount).then(() => {
          const updatedBalance = numericBalance - numericAmount;
          console.log(`Withdraw Amount: ${numericAmount}, New Balance: ${updatedBalance}`);
          dispatch(updateUserBalance(updatedBalance));
        }
      )
    } catch (error) {
      console.log("Error upon withdrawal:", error)
    }
    
    // Logic to update balance with the withdrawal amount
    
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