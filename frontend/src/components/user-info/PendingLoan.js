import { Box, Flex, Button, Text } from "@chakra-ui/react";
import React from "react";

function PendingLoan({ onCancel }) {
    return (
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p={6} m={6}>
            <Flex
                direction="column"
                align="center"
                justify="center"
                textAlign="center"
            >
                <Text fontSize="xl" fontWeight="bold" mb={4}>
                    Pending Loan
                </Text>
                <Text fontSize="md" color="gray.500" mb={6}>
                    Loan Pending...
                </Text>
                <Button 
                    colorScheme="red" 
                    onClick={onCancel}
                >
                    Cancel Request
                </Button>
            </Flex>
        </Box>
    )
}

export default PendingLoan