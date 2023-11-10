import { Box, Flex, Button, Input, FormControl, FormLabel, Stack } from "@chakra-ui/react";
import React from "react";

function RequestLoan({ onRequestLoan }) {
    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={6} m={6}>
            <Flex direction="column" align="start" justify="center">
                <FormLabel fontSize="xl" fontWeight="bold" mb={8}>
                    Request Loan
                </FormLabel>
                <Stack direction="row" spacing={15} mb={20}>
                    <FormControl id="amount">
                        <FormLabel>Amount</FormLabel>
                        <Input placeholder="$0.00" />
                    </FormControl>
                    <FormControl id="interest">
                        <FormLabel>Interest</FormLabel>
                        <Input placeholder="10%" />
                    </FormControl>
                    <FormControl id="dueDate">
                        <FormLabel>Due Date</FormLabel>
                        <Input placeholder="Enter due date" type="date" />
                    </FormControl>
                </Stack>
                <Button colorScheme="blue" onClick={onRequestLoan} mb={4}>
                    Request
                </Button>
            </Flex>
        </Box>
    )
}

export default RequestLoan;