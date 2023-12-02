import { Box, HStack, Flex, Button, Text, CircularProgress, CircularProgressLabel, VStack, Spacer } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateLoanBalance } from "../../state/actions"


function PendingLoan({ onFilled, onCancel }) {
    const loans = useSelector((state) => state.loan.loans)
    const currentUser = useSelector((state) => state.member.currentUser)
    const dispatch = useDispatch()
    const [pendingLoan, setPendingLoan] = useState({})

    useEffect(() => {
        const loanFilt = loans.filter((l) => l.id === currentUser.loanid)
        if (loanFilt.length === 1) {
            setPendingLoan(loanFilt[0])
        }
        //eslint-disable-next-line
    }, [loans])

    const LoanStat = ({ label, value }) => (
        <Flex justify="space-between" align="center" w="100%">
            <Text fontWeight="semibold">{label}</Text>
            <Spacer />
            <Text>{value}</Text>
        </Flex>
    );

    const percentFilled = pendingLoan?.filled / pendingLoan?.amount * 100;

    const increaseFilledBy25 = () => {
        if (pendingLoan.filled + 1 < pendingLoan.amount) {
            dispatch(updateLoanBalance(pendingLoan.id, pendingLoan.filled + 1))
        } else {
            onFilled(pendingLoan.amount)
        }
    };

    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={6} m={6}>
            <VStack spacing={4}>
                <Text fontSize="2xl" fontWeight="bold" p={6}>
                    My Pending Loan ID: {pendingLoan?.id}
                </Text>
                <Flex direction="row" w="100%" justify="space-between">
                    <VStack align="flex-start" w="33%">
                        <LoanStat label="Amount" value={`$${pendingLoan?.amount}`} />
                        <LoanStat label="Filled" value={`$${pendingLoan?.filled}`} />
                        <LoanStat label="Description" value={pendingLoan?.description} />
                    </VStack>
                    <VStack align="center" w="33%">
                        <CircularProgress value={percentFilled} size="100px" color="blue">
                            <CircularProgressLabel>{percentFilled}%</CircularProgressLabel>
                        </CircularProgress>
                    </VStack>
                    <VStack align="flex-end" w="33%">
                        <LoanStat label="Due Date" value={pendingLoan?.dueDate} />
                        <LoanStat label="Interest" value={`${pendingLoan?.interest}%`} />
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
