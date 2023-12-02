import { Box, Flex, Button, Text, VStack, HStack } from "@chakra-ui/react";
import React from "react";

function ActiveLoan({ amountDue, interest, dueDate, onPayNow }) {
    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={8} m={6}>
            <VStack align="stretch" spacing={6}>
                <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    textAlign="center"
                >
                    <Text fontSize="xl" fontWeight="bold" p={3}>
                        Active Loan
                    </Text>
                </Flex>
                <HStack justify="center" spacing={20}>
                    <Box textAlign="center">
                        <Text fontSize="sm" color="gray.500">
                            Amount Due
                        </Text>
                        <Text fontSize="lg" fontWeight="semibold">
                            {amountDue}
                        </Text>
                    </Box>
                    <Box textAlign="center">
                        <Text fontSize="sm" color="gray.500">
                            Interest
                        </Text>
                        <Text fontSize="lg" fontWeight="semibold">
                            {interest}
                        </Text>
                    </Box>
                    <Box textAlign="center">
                        <Text fontSize="sm" color="gray.500">
                            Due Date
                        </Text>
                        <Text fontSize="lg" fontWeight="semibold">
                            {dueDate}
                        </Text>
                    </Box>
                </HStack>
                <Flex justify="flex-start" p={4}>
                    <Button 
                        colorScheme="blue" 
                        onClick={onPayNow}
                    >
                        Pay Now
                    </Button>
                </Flex>
            </VStack>
        </Box>
    )
}

export default ActiveLoan;
