import { Box, Flex, Button, Input, FormControl, FormLabel, Stack } from "@chakra-ui/react";
import React, { useState } from "react";

function RequestLoan({ onRequestLoan }) {
    const [amount, setAmount] = useState("");
    const [interest, setInterest] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [description, setDescription] = useState(""); // State to handle the description

    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={6} m={6}>
            <Flex direction="column" align="start" justify="center">
                <FormLabel fontSize="xl" fontWeight="bold" mb={8}>
                    Request Loan
                </FormLabel>
                <Stack direction="row" spacing={15} mb={4}>
                    <FormControl id="amount">
                        <FormLabel>Amount</FormLabel>
                        <Input placeholder="$0.00" onChange={(e) => setAmount(e.target.value)} />
                    </FormControl>
                    <FormControl id="interest">
                        <FormLabel>Interest</FormLabel>
                        <Input placeholder="10%" onChange={(e) => setInterest(e.target.value)} />
                    </FormControl>
                    <FormControl id="dueDate">
                        <FormLabel>Due Date</FormLabel>
                        <Input placeholder="Enter due date" type="date" onChange={(e) => setDueDate(e.target.value)} />
                    </FormControl>
                </Stack>
                <FormControl id="description" mb={4}>
                    <FormLabel>Reason</FormLabel>
                    <Input placeholder="Describe the reason for the loan" onChange={(e) => setDescription(e.target.value)} />
                </FormControl>
                <Button colorScheme="blue" onClick={() => onRequestLoan(amount, interest, dueDate, description)}>
                    Request
                </Button>
            </Flex>
        </Box>
    )
}

export default RequestLoan;
