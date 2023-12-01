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
  import {React, useState} from "react";
  
function Balance({ balance, onDeposit, onWithdraw }) {
    const [depositAmount, setDepositAmount] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('');

    const handleDepositClick = () => {
        onDeposit(parseFloat(depositAmount));
        setDepositAmount(''); // Resetting the input field after deposit
    };

    const handleWithdrawClick = () => {
        onWithdraw(parseFloat(withdrawAmount));
        setWithdrawAmount(''); // Resetting the input field after withdrawal
    };
  
      return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} m={4} bgColor="white">
            <FormLabel fontSize="xl" fontWeight="bold" mb={4}>
              Balance
          </FormLabel>
          <Flex p={4} bg="blue.100" borderRadius="lg" mb={4} justify="space-between" align="center">
            <Text fontSize="2xl" fontWeight="semibold">
              {balance}
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
                        <Input placeholder="$0.00" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} />
                    </FormControl>
                    <Button colorScheme="green" onClick={handleDepositClick}>Deposit +</Button>
                </Stack>
                <Stack direction="row" spacing={3} width="full" alignItems="flex-end">
                    <FormControl id="withdrawAmount">
                        <FormLabel>Withdraw Amount</FormLabel>
                        <Input placeholder="$0.00" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} />
                    </FormControl>
                    <Button colorScheme="red" onClick={handleWithdrawClick}>Withdraw -</Button>
                </Stack>
            </Flex>
          </Flex>
        </Box>
      );
    }   
  
  export default Balance;
  