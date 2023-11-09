import { Box, Text, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";
import Loan from "./Loan";

// PROPS NEEDED
// list of open loans
// 

function OpenLoans() {
    const openLoans = [
        {
            borrower: "LOAN 1",
            amount: 2000,
            filled: 1500,
            dueDate: "December 1",
            isFulfilled: false,
        },
        {
            borrower: "LOAN 2",
            amount: 2500,
            filled: 1200,
            dueDate: "December 2",
            isFulfilled: false,
        },
        {
            borrower: "LOAN 3",
            amount: 750,
            filled: 150,
            dueDate: "December 3",
            isFulfilled: false,
        }
    ]
    return (
        <Box
            marginLeft={'2vw'}
            marginRight={'2vw'}
            borderRadius={'30px'}
            borderWidth={'1px'}
            boxShadow={'base'}
        >
            <Box 
                marginLeft={'25px'} 
                fontSize={'x-large'}
                as={"b"}
                textColor={'darkgray'}
                >Open Loans</Box>
            <Wrap justify={'center'}>
                {openLoans.map((loan) => {
                    return (
                        <WrapItem>
                            <Loan loan={loan} />
                        </WrapItem>
                    )
                })
                }
            </Wrap>
        </Box>
    )
}

export default OpenLoans