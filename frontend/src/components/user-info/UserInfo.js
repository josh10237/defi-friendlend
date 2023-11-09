import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import RequestLoan from "./RequestLoan";
import PendingLoan from "./PendingLoan";
import Balance from "./Balance";

function UserInfo() {
    return (
        <Flex>
            <RequestLoan />
            <PendingLoan />
            <Balance />
        </Flex>
    )
}

export default UserInfo