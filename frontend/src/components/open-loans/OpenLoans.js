import { Box, FormLabel, Wrap, WrapItem } from "@chakra-ui/react";
import React, { useState } from "react";
import Loan from "./Loan";

// PROPS NEEDED
// list of open loans

function OpenLoans() {
    const [openLoans, setOpenLoans] = useState([
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
    const contributeHandler = (loan, contribution) => {
        console.log("Contributed", contribution, "to loan ", loan.key)
        const newOpenLoans = openLoans.map((l) => {
            if (l.key === loan.key) {
                const newFilled = l.filled + parseFloat(contribution);
                if (newFilled < l.amount) {
                    const newLoan = {...l, filled: newFilled}
                    return newLoan
                }
            }
            return l;
        })
        setOpenLoans(newOpenLoans)
    }

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
                            <Loan key={loan.key} loan={loan} onContribute={contributeHandler} />
                        </WrapItem>
                    )
                })
                }
            </Wrap>
        </Box>
    )
}

export default OpenLoans