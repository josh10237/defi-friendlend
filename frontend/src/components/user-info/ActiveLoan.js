import { Box, Flex, Button, Text, VStack, HStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function ActiveLoan({ onPayNow }) {

    const loans = useSelector((state) => state.loan.loans)
    const currentUser = useSelector((state) => state.member.currentUser)
    const [activeLoan, setActiveLoan] = useState({})

    const handlePayNow = () => {
        onPayNow(parseFloat(activeLoan?.amount * (activeLoan?.interest / 100 + 1)).toFixed(2))
    }

    useEffect(() => {
        const loanFilt = loans.filter((l) => l.id === currentUser.loanid)
        if (loanFilt.length === 1) {
            setActiveLoan(loanFilt[0])
        }
        //eslint-disable-next-line
    }, [loans])

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
                            {`$${parseFloat(activeLoan?.amount * (activeLoan?.interest / 100 + 1)).toFixed(2)}`}
                        </Text>
                    </Box>
                    <Box textAlign="center">
                        <Text fontSize="sm" color="gray.500">
                            Interest
                        </Text>
                        <Text fontSize="lg" fontWeight="semibold">
                            {`${activeLoan?.interest}%`}
                        </Text>
                    </Box>
                    <Box textAlign="center">
                        <Text fontSize="sm" color="gray.500">
                            Due Date
                        </Text>
                        <Text fontSize="lg" fontWeight="semibold">
                            {activeLoan?.dueDate}
                        </Text>
                    </Box>
                </HStack>
                <Flex justify="flex-start" p={4}>
                    <Button 
                        colorScheme="blue" 
                        onClick={handlePayNow}
                    >
                        Pay Now
                    </Button>
                </Flex>
            </VStack>
        </Box>
    )
}

export default ActiveLoan;
