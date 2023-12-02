import { Box, HStack, Flex, Button, Text, CircularProgress, CircularProgressLabel, VStack, Spacer } from "@chakra-ui/react";
import React, { useState } from "react";


function PendingLoan({ onFilled, onCancel, loanID, amount, interest, dueDate, description, initialFilled }) {
    const LoanStat = ({ label, value }) => (
        <Flex justify="space-between" align="center" w="100%">
            <Text fontWeight="semibold">{label}</Text>
            <Spacer />
            <Text>{value}</Text>
        </Flex>
    );

    const [filled, setFilled] = useState(initialFilled);
    const percentFilled = filled / amount * 100;

    const increaseFilledBy25 = () => {
        const newFilled = filled + 25;
        console.log("NewFilled: ", newFilled, "Filled: ", filled, "Amount", amount);
        console.log("Types: ", typeof newFilled, typeof parseFloat(amount));
        if (newFilled === parseFloat(amount)){
            console.log("Loan filled 100%");
            onFilled(); 
            setFilled(newFilled);
        }
        console.log("Between");
        if (newFilled > parseFloat(amount)) { // Assuming you can't overfill the loan
            console.log("Over filling loan cancel action");
        } else {
            setFilled(newFilled);
        }
        console.log("Filled (after): " + filled);
    };
    console.log("Pending Loan Incoming Data");
    console.log("loanID: " + loanID);
    console.log("Amount: " + amount);
    console.log("Filled: " + filled);
    console.log("Percent Filled: " + percentFilled.toFixed(2) + "%"); // toFixed(2) to format the number to two decimal places
    console.log("Interest: " + interest);
    console.log("Due Date: " + dueDate);
    console.log("Description: " + description);

    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={6} m={6}>
            <VStack spacing={4}>
                <Text fontSize="2xl" fontWeight="bold" p={6}>
                    My Pending Loan ID: {loanID}
                </Text>
                <Flex direction="row" w="100%" justify="space-between">
                    <VStack align="flex-start" w="33%">
                        <LoanStat label="Amount" value={`$${amount}`} />
                        <LoanStat label="Filled" value={`$${filled}`} />
                        <LoanStat label="Description" value={description} />
                    </VStack>
                    <VStack align="center" w="33%">
                        <CircularProgress value={percentFilled} size="100px" color="blue">
                            <CircularProgressLabel>{percentFilled}%</CircularProgressLabel>
                        </CircularProgress>
                    </VStack>
                    <VStack align="flex-end" w="33%">
                        <LoanStat label="Due Date" value={dueDate} />
                        <LoanStat label="Interest" value={`${interest}%`} />
                        <LoanStat label="Daily Rate" value="2.5%" />
                    </VStack>
                </Flex>
                <HStack w="100%" justify="space-between" p={2}>
                    <Button onClick={increaseFilledBy25} size="sm" opacity={0}>
                        Increase Filled
                    </Button>
                    <Spacer />
                    <Button colorScheme="red" onClick={onCancel} size="sm">
                        Cancel Request
                    </Button>
                </HStack>
            </VStack>
        </Box>
    );
}

export default PendingLoan;
