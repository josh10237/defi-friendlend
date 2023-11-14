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

function MemberList ({contract}) {
  const [memberAddress, setMemberAddress] = useState("");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const [members, setMembers] = useState([])
  
  const getMemberList = async () => {
    try {
      const result = await contract.methods.getAllConfirmedMembers().call()
      console.log("Result from contract:", result);
      return result;
    } catch (e) {
      console.error("Error fetching data from contract:", e);
    }
    
  }

  useEffect(() => {
    getMemberList().then((result) => {
      setMembers(result)
    })
    // eslint-disable-next-line
  }, [])


  const handleRequestClick = () => {
    // Implement what should happen when the request is clicked
    console.log("Request for address:", memberAddress);
    // Reset the input field after request
    setMemberAddress("");
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
              value={memberAddress}
              onChange={(e) => setMemberAddress(e.target.value)}
              flexGrow={1}
            />
            <Button colorScheme="blue" onClick={handleRequestClick}>Request</Button>
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
              username={m.username}
              friendLendScore={m.memberAddress}
              dateJoined={m.myPassword}
              balance={m.balance}
              pending={m.isPending}
            />
          )
        })}
        <MemberItem
            username="0x03592358689"
            friendLendScore="0"
            dateJoined="July 15, 2023"
            balance="0"
            pending={true}
        />
        <MemberItem
            username="Josh Benson"
            friendLendScore="173"
            dateJoined="July 12, 2023"
            balance="7,500"
            pending={false}
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
