import { Box, Flex, Button, Input, FormControl, FormLabel, Stack } from "@chakra-ui/react";
import React, { useState } from "react";

function RequestLoan({ onRequestLoan }) {
    // the onRequestLoan parameter is a function that is called in the parent component variable upon a loan request

    // form state control
    const [amount, setAmount] = useState("")
    const [interest, setInterest] = useState("")
    const [dueDate, setDueDate] = useState("")
    // const dueDate = 121212
    // const [description, setDescription] = useState("")
    const description = "yea this is a pretty cool loan if you ask me give me money!"

    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={6} m={6}>
            <Flex direction="column" align="start" justify="center">
                <FormLabel fontSize="xl" fontWeight="bold" mb={8}>
                    Request Loan
                </FormLabel>
                <Stack direction="row" spacing={15} mb={20}>
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
                        <Input placeholder="Enter due date" type="date"  onChange={(e) => {setDueDate(e.target.value)}} />
                    </FormControl>
                </Stack>
                <Button colorScheme="blue" onClick={() => onRequestLoan(amount, interest, dueDate, description)} mb={4}>
                    Request
                </Button>
            </Flex>
        </Box>
    )
}

export default RequestLoan;