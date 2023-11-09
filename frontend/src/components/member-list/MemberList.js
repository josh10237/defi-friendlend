import { Flex } from "@chakra-ui/react";
import React from "react";

function MemberList() {
    const members = [
        {
            memberAddress: "mem1",
            username: 'Josh',
            friendScore: 760,
            balance: 7500,
            isPending: false,
            dateAdded: "November 9"
        },
        {
            memberAddress: "mem2",
            username: 'Joey',
            friendScore: 740,
            balance: 8000,
            isPending: false,
            dateAdded: "November 8"
        },
        {
            memberAddress: "mem3",
            username: 'Dylan',
            friendScore: 763,
            balance: 6800,
            isPending: false,
            dateAdded: "November 7"
        },
        {
            memberAddress: "mem4",
            username: 'Cyril',
            friendScore: 700,
            balance: 2000,
            isPending: true,
            dateAdded: "pending"
        }
    ]
    return (
        <Flex>
            MEMBER LIST
        </Flex>
    )
}

export default MemberList