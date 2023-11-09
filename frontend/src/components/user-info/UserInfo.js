import { Flex, Box, Spinner } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import RequestLoan from "./RequestLoan";
import PendingLoan from "./PendingLoan";
import ActiveLoan from "./ActiveLoan";
import Balance from "./Balance";

function UserInfo({ memberAddress }) {
  const [loanData, setLoanData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(null); // You would fetch this from your smart contract

  useEffect(() => {
    async function fetchLoanData() {
      setLoading(true);
      try {
        // Fetch loan and balance data from your smart contract
        // const data = await smartContract.getLoanByMember(memberAddress);
        // setLoanData(data);
        // setBalance(/* balance data */);
      } catch (error) {
        console.error("Error fetching loan data:", error);
      }
      setLoading(false);
    }

    fetchLoanData();
  }, [memberAddress]);

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
    return <RequestLoan />;
  }

  return (
    <Flex direction="row" wrap="wrap">
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
