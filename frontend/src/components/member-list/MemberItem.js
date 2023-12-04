import React from "react";
import { Grid, Text, Button, Box } from "@chakra-ui/react";

function MemberItem({ address, username, friendLendScore, dateJoined, balance, pending, onVote, voted }) {
    return (
        <Grid templateColumns="repeat(5, 1fr)" gap={4} alignItems="center" p={4} borderWidth="1px" borderRadius="lg" mb={2}>
            <Text fontWeight="bold">{pending ? address : username}</Text>
            <Text>{pending ? '' : friendLendScore}</Text>
            <Text>{pending ? '' : dateJoined}</Text>
            <Text>{pending ? '' : balance}</Text>
            <Box justifySelf="end">
            {pending && !voted ? ( // Check if the member is pending and not voted
                <Box>
                    <Button colorScheme="green" mr={2} onClick={() => onVote(true)}>Approve</Button>
                    <Button colorScheme="red" onClick={() => onVote(false)}>Reject</Button>
                </Box>
            ) : (
                <Text>{voted ? "Voted" : "Not Pending"}</Text> // Display "Voted" or some other text
            )}
        </Box>
        </Grid>
    );
}

export default MemberItem;
