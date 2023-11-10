import React from "react";
import { Grid, Text, Button, Box } from "@chakra-ui/react";

function MemberItem({ username, friendLendScore, dateJoined, balance, pending }) {
    return (
        <Grid templateColumns="repeat(5, 1fr)" gap={4} alignItems="center" p={4} borderWidth="1px" borderRadius="lg" mb={2}>
            <Text fontWeight="bold">{username}</Text>
            <Text>{friendLendScore}</Text>
            <Text>{dateJoined}</Text>
            <Text>{balance}</Text>
            <Box justifySelf="end">
                {pending ? (
                    <Box>
                        <Button colorScheme="green" mr={2}>Approve</Button>
                        <Button colorScheme="red">Reject</Button>
                    </Box>
                ) : (
                    <Text>False</Text>
                )}
            </Box>
        </Grid>
    );
}

export default MemberItem;
