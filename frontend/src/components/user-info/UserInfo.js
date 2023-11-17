import { Flex, Box, Spinner } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import RequestLoan from "./RequestLoan";
import PendingLoan from "./PendingLoan";
import ActiveLoan from "./ActiveLoan";
import Balance from "./Balance";

function UserInfo({ memberAddress, contract }) {
  // state variables
  const [loanData, setLoanData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(null); // You would fetch this from your smart contract

  // function to fetch loan data, called in useEffect
  async function fetchLoanData() {
    try {
      const result = await contract.methods.getAllOpenLoans().call();
      console.log("Result after fetching loan data:", result)
      setLoanData(result)
    } catch (error) {
      console.error("Error fetching loan data:", error);
    }
  }

  // TODO: fetch user balance function
  async function fetchUserBalance() {
    console.log("Fetching User Balance")
  }

  // fetch data for component
  useEffect(() => {
    setLoading(true);
    fetchLoanData();
    fetchUserBalance()
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
        console.log("loan request complete:", l)
      })
    } catch (e) {
      console.error("Error requesting loan:", e)
    }
    fetchLoanData()
  }



  // defines which loan component should be displayed based on fetched data
  function renderLoanComponent() {
    if (loading) {
      return <Spinner />;
    }
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
      }
    }
    return <RequestLoan onRequestLoan={onRequestLoan} />;
  }

  return (
    <Flex direction="row" align="stretch" wrap="wrap">
      <Box flex="2" minW={{ base: "100%", md: "66%" }} p={3}>
        {renderLoanComponent()}
      </Box>
      <Box flex="1" minW={{ base: "100%", md: "33%" }} p={3}>
        <Balance balance={balance} />
      </Box>
    </Flex>
  );
}

export default UserInfo;