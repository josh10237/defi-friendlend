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
            <FormLabel fontSize="xl" fontWeight="bold" mb={4}>
              Balance
          </FormLabel>
          <Flex p={4} bg="blue.100" borderRadius="lg" mb={4} justify="space-between" align="center">
            <Text fontSize="2xl" fontWeight="semibold">
              7,500
            </Text>
            <Text fontSize="2xl" fontWeight="semibold">
              Dai
            </Text>
          </Flex>
          <Flex
            direction="column"
            align="center"
            justify="center"
            textAlign="center"
          >
        
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
  