import { Box, Center, FormLabel, Spinner, Text, Wrap, WrapItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Loan from "./Loan";
import { useDispatch, useSelector } from "react-redux";
import { setLoans, updateUserBalance } from "../../state/actions";

// PROPS NEEDED
// list of open loans

function OpenLoans({contract, abi}) {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const openLoans = useSelector((state) => state.loan.loans)
    const currentUser = useSelector((state) => state.member.currentUser)

    // fetch data for component
    useEffect(() => {
        // function to fetch loan data from backend on load
        async function fetchLoanData() {
            try {
                const loans = [];
                const badLoans = await contract.methods.getAllOpenLoans().call();

                const numLoans = badLoans.length
                console.log(numLoans)
                for (let i = 0; i < numLoans; i += 1) {
                    const l = await contract.methods.loans(i).call();
                    if (l.exists) {
                        loans.push(l)
                    }
                }
                console.log("REDUX OPEN LOANS:",loans)
                dispatch(setLoans(loans));
            } catch (error) {
                console.error("Error fetching loan data:", error);
            }
        }
        setLoading(true);
        fetchLoanData();
        setLoading(false);
        // eslint-disable-next-line
    }, []);

    //DUMMY DATA, REMOVE LATER
    const [gapopenLoans, setOpenLoans] = useState([
        {
            key: 1,
            borrower: 0x69294144bC1445C0E92a4ad3C572249841091544,
            amount: 2000,
            filled: 1500,
            dueDate: "December 1",
            isFulfilled: false,
            interest: "10%"
        },
        {
            key: 2,
            borrower: 0x69294144bC1445C0E92a4ad3C572249841091544,
            amount: 2500,
            filled: 1200,
            dueDate: "December 2",
            isFulfilled: false,
            interest: "20%"
        },
        {
            key: 3,
            borrower: 0x69294144bC1445C0E92a4ad3C572249841091544,
            amount: 750,
            filled: 150,
            dueDate: "December 3",
            isFulfilled: false,
            interest: "15%"
        }
    ])
    //TODO handler still needs to interact with backend, frontend only rn
    const contributeHandler = async (loan, contribution) => {
        console.log("Contributing", contribution, "to loan ", loan.id)
        console.log(currentUser)
        try {
            await abi(
                "fillLoanRequest", 
                // filling from current user address and pk
                currentUser.memberAddress, 
                "3b5c8eb5d0d5b2e3f86805aa2a4e3f2a4d939e88791c238984237263a7ebe3d3", 
                null,
                loan.id, parseFloat(contribution)).then(() => {
                    const newOpenLoans = openLoans.map((l) => {
                        if (l.id === loan.id) {
                            const newFilled = l.filled + parseFloat(contribution);
                            if (newFilled < l.amount) {
                                const newLoan = {...l, filled: newFilled}
                                return newLoan
                            }
                        }
                        return l;
                    })
                    dispatch(updateUserBalance(currentUser.balance - parseFloat(contribution)))
                    dispatch(setLoans(newOpenLoans))
                })
        } catch (e) {
            console.log("Error upon filling loan request: ", e)
        }
        
        // setOpenLoans(newOpenLoans)
    }
    if (loading) {
        return (
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={6} m={6}>
                <Center flexDirection={'column'}>
                    <Spinner size={'xl'} m={'50px'} />
                    <Text>Fetching Open Loan Requests...</Text>
                </Center>
            </Box>
        )
    } else {
        return (
            <Box
                p={6}
                m={6}
                borderRadius={'lg'}
                borderWidth={'1px'}
            >
                <FormLabel fontSize="xl" fontWeight="bold" ml={8}>
                    Open Loans
                </FormLabel>
                <Wrap justify={'center'}>
                    {openLoans.map((loan) => {
                        return (
                            <WrapItem>
                                <Loan key={loan.id} loan={loan} onContribute={contributeHandler} />
                            </WrapItem>
                        )
                    })
                    }
                </Wrap>
            </Box>
        )
    }
}

export default OpenLoans