import {
    Box,
    Flex,
    Text,
    Button,
    Input,
    FormControl,
    FormLabel,
    Stack
  } from "@chakra-ui/react";
  import React from "react";
  
  function Balance() {
      // You can manage the state for deposit and withdrawal amounts using useState if needed
      // const [depositAmount, setDepositAmount] = useState('');
      // const [withdrawAmount, setWithdrawAmount] = useState('');
  
      return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} m={4} bgColor="white">
          <Flex
            direction="column"
            align="center"
            justify="center"
            textAlign="center"
          >
            <Box p={4} bg="blue.100" borderRadius="lg" mb={4}>
              <Text fontSize="xl" fontWeight="bold" mb={2}>
                Balance
              </Text>
              <Text fontSize="2xl" fontWeight="semibold">
                7,500 Dai
              </Text>
            </Box>
            <Flex direction="column" width="full">
              <Stack direction="row" spacing={3} mb={4} width="full" alignItems="flex-end">
                <FormControl id="depositAmount">
                  <FormLabel>Deposit Amount</FormLabel>
                  <Input placeholder="$0.00" />
                </FormControl>
                <Button colorScheme="green">Deposit +</Button>
              </Stack>
              <Stack direction="row" spacing={3} width="full" alignItems="flex-end">
                <FormControl id="withdrawAmount">
                  <FormLabel>Withdraw Amount</FormLabel>
                  <Input placeholder="$0.00" />
                </FormControl>
                <Button colorScheme="red">Withdraw -</Button>
              </Stack>
            </Flex>
          </Flex>
        </Box>
      );
    }   
  
  export default Balance;
  