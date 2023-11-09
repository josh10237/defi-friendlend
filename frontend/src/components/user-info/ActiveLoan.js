import { Box, Flex, Button, Text, Stack } from "@chakra-ui/react";
import React from "react";

function ActiveLoan({ amountDue, interest, dueDate, onPayNow }) {
    return (
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p={6} m={6}>
            <Flex
                direction="column"
                align="center"
                justify="center"
                textAlign="center"
            >
                <Text fontSize="xl" fontWeight="bold" mb={4}>
                    Active Loan
                </Text>
                <Stack direction="row" mb={6} spacing={4} align="center" justify="center">
                    <Box>
                        <Text fontSize="sm" color="gray.500">
                            Amount Due
                        </Text>
                        <Text fontSize="lg" fontWeight="semibold">
                            {amountDue}
                        </Text>
                    </Box>
                    <Box>
                        <Text fontSize="sm" color="gray.500">
                            Interest
                        </Text>
                        <Text fontSize="lg" fontWeight="semibold">
                            {interest}
                        </Text>
                    </Box>
                    <Box>
                        <Text fontSize="sm" color="gray.500">
                            Due Date
                        </Text>
                        <Text fontSize="lg" fontWeight="semibold">
                            {dueDate}
                        </Text>
                    </Box>
                </Stack>
                <Button 
                    colorScheme="blue" 
                    onClick={onPayNow}
                >
                    Pay Now
                </Button>
            </Flex>
        </Box>
    )
}

export default ActiveLoan;
