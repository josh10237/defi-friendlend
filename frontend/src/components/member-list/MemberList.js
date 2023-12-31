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
import { setCurrentUser, setMembers } from "../../state/actions";

function MemberList ({contract, abi}) {
  const currentUser = useSelector((state) => state.member.currentUser)
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
      // const members = await contract.methods.getAllConfirmedMembers().call()
      const member1 = await contract.methods.members("0xcaCCC3933801B308F6261B941EA2C68c93730849").call()
      const member2 = await contract.methods.members("0x69294144bC1445C0E92a4ad3C572249841091544").call()
      const pendingMembers1 = await contract.methods.getMembersToVoteOn().call();
      const pendingMembers2 = await contract.methods.getPendingMembers().call();
      for (let m of pendingMembers2) {
        setVotedMembers(prevState => ({ ...prevState, [m.memberAddress]: true }))
      }
      const members = [...pendingMembers1, ...pendingMembers2, member1, member2]
      console.log("retrieved members:", members)
      dispatch(setMembers(members))
      dispatch(setCurrentUser(member1))
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
      await abi(
        "proposeInvite", 
        currentUser.memberAddress, 
        "3b5c8eb5d0d5b2e3f86805aa2a4e3f2a4d939e88791c238984237263a7ebe3d3", 
        null, 
        proposedMemberAddress).then(() => {
          getMemberList()
        })
    } catch (e) {
      setRequestLoading(false)
      console.error("Error while proposing invite:", e)
    }
    setRequestLoading(false);
    // Reset the input field after request
    setProposedMemberAddress("");
  };

  const handleVote = async (candidateAddress, vote) => {
      // Logic to handle approve action
      console.log("handleVote called on user", candidateAddress);
      setVotedMembers(prevState => ({ ...prevState, [candidateAddress]: true }));
      try {
        await abi(
          "voteOnPendingPerson", 
          currentUser.memberAddress, 
          "3b5c8eb5d0d5b2e3f86805aa2a4e3f2a4d939e88791c238984237263a7ebe3d3", 
          null, 
          candidateAddress, vote).then(() => {
            // getMemberList()
            console.log("vote complete")
          })
      } catch (e) {
        setRequestLoading(false)
        console.error("Error sending vote for", candidateAddress, ":", e);
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
              isDisabled={requestLoading}
            />
            <Button colorScheme="blue" isLoading={requestLoading} onClick={handleRequestClick} >Request</Button>
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
              key={m.memberAddress}
              address={m.memberAddress}
              username={m.username}
              friendLendScore={m.friendScore}
              dateJoined={m.dateAdded}
              balance={m.balance}
              pending={m.isPending}
              onVote={(vote) => handleVote(m.memberAddress, vote)} // Passing handleVote as a prop
              voted={votedMembers[m.memberAddress]}
            />
          )
        })}
        
      </Flex>
    </Box>
  );
}

export default MemberList;
