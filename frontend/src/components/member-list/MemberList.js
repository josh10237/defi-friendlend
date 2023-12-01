import React, { useEffect, useState } from "react";
import MemberItem from "./MemberItem";
import {
  Box,
  Flex,
  Spacer,
  Heading,
  Input,
  Button,
  HStack,
  Grid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setMembers } from "../../state/actions";

function MemberList ({contract}) {
  // control state for member proposed by user
  const [proposedMemberAddress, setProposedMemberAddress] = useState("");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  // member list state
  const members = useSelector((state) => state.member.members)
  const dispatch = useDispatch()
  // loading indicator for member add requests
  const [requestLoading, setRequestLoading] = useState(false)

  //who u voted on
  const [votedMembers, setVotedMembers] = useState({}); 
  
  // function to retrieve list of members upon page load
  const getMemberList = async () => {
    // retrieve and log member list
    try {
      const members = await contract.methods.getAllConfirmedMembers().call()
      dispatch(setMembers(members))
      console.log("Members Retrieved:", members)
    } catch (e) {
      console.error("Error retrieving Member List:", e)
    }
    
  }

  useEffect(() => {
    getMemberList()
    // eslint-disable-next-line
  }, [])

  // on click handler for member proposal
  const handleRequestClick = async () => {
    setRequestLoading(true);
    console.log("Request for address:", proposedMemberAddress);
    try {
      const result = await contract.methods.proposeInvite(proposedMemberAddress).call()
      console.log("Result of proposing invite:", result)
    } catch (e) {
      setRequestLoading(false)
      console.error("Error while proposing invite:", e)
    }
    setRequestLoading(false);
    // Reset the input field after request
    setProposedMemberAddress("");
  };

  const handleVote = async (username, vote) => {
      // Logic to handle approve action
      console.log("handleVote called on user", username);
      setVotedMembers(prevState => ({ ...prevState, [username]: true }));
      try {
        const result = await contract.methods.voteOnPendingPerson(username, vote).call()
        console.log("Vote sent for", username, ":", vote, "Response:", result);
      } catch (e) {
        setRequestLoading(false)
        console.error("Error sending vote for", username, ":", e);
      }
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} m={4} bgColor="white" borderColor={borderColor}>
      <Flex direction="column" w="full">
        <Heading size="lg" mb={6}>All Members</Heading>
        <Flex w="full">
          <Spacer />
          <HStack spacing={4} justify="flex-end" w="50%">
            <Heading size="md" whiteSpace="nowrap" mr={4}>Add Member</Heading>
            <Input
              placeholder="0x0000000000"
              value={proposedMemberAddress}
              onChange={(e) => setProposedMemberAddress(e.target.value)}
              flexGrow={1}
            />
            <Button colorScheme="blue" onClick={handleRequestClick} disabled={requestLoading}>Request</Button>
          </HStack>
        </Flex>
        {/* Column Headers */}
        <Grid templateColumns="repeat(5, 1fr)" gap={4} mt={10} mb={4}>
          <Text fontWeight="bold">Username</Text>
          <Text fontWeight="bold">FriendLend Score</Text>
          <Text fontWeight="bold">Date Joined</Text>
          <Text fontWeight="bold">Balance</Text>
          <Text fontWeight="bold" justifySelf="end">Pending</Text>
        </Grid>
        {/* Member List */}
        {/* Map over your member data here to render MemberItem components */}
        {members.map((m) => {
          return (
            <MemberItem 
              key={m.username}
              username={m.username}
              friendLendScore={m.memberAddress}
              dateJoined={m.myPassword}
              balance={m.balance}
              pending={true}
              onVote={(vote) => handleVote(m.username, vote)} // Passing handleVote as a prop
              voted={votedMembers[m.username]}
            />
          )
        })}
        {/* Filler Member Data, temporary! */}
        <MemberItem
            username="0x03592358689"
            friendLendScore="0"
            dateJoined="July 15, 2023"
            balance="0"
            pending={true}
            onVote={(vote) => handleVote("m.username", vote)} // Passing handleVote as a prop
            voted={votedMembers["m.username"]}
        />
        <MemberItem
            username="Josh Benson"
            friendLendScore="173"
            dateJoined="July 12, 2023"
            balance="7,500"
            pending={true}
            onVote={(vote) => handleVote("m.username1", vote)} // Passing handleVote as a prop
            voted={votedMembers["m.username1"]}
        />
        <MemberItem
            username="Joey Laderer"
            friendLendScore="173"
            dateJoined="July 12, 2023"
            balance="97,500"
            pending={false}
        />
        <MemberItem
            username="Dylan Goetting"
            friendLendScore="173"
            dateJoined="July 12, 2023"
            balance="7,000"
            pending={false}
        />
        
        {/* ... other members */}
      </Flex>
    </Box>
  );
}

export default MemberList;
