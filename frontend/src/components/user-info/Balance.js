import {
    Box,
    Flex,
    Text,
    Button,
    Input,
    FormControl,
    FormLabel,
    Stack,
    Center,
    Spinner
  } from "@chakra-ui/react";
  import {React, useState} from "react";
  
function Balance({ balance, onDeposit, onWithdraw }) {
    const [depositAmount, setDepositAmount] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [loading, setLoading] = useState(false)

    const handleDepositClick = async () => {
      setLoading(true)
      await onDeposit(parseFloat(depositAmount));
      setDepositAmount(''); // Resetting the input field after deposit
      setLoading(false)
    };

    const handleWithdrawClick = async () => {
      setLoading(true)
      await onWithdraw(parseFloat(withdrawAmount));
      setWithdrawAmount(''); // Resetting the input field after withdrawal
      setLoading(false)
    };
      return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} m={4} bgColor="white">
            <FormLabel fontSize="xl" fontWeight="bold" mb={4}>
              Balance
          </FormLabel>
          <Flex p={4} bg="blue.100" borderRadius="lg" mb={4} justify="space-between" align="center">
            <Text fontSize="xl" fontWeight="semibold">
            {`$${parseFloat(balance)}`}
            </Text>
            <Text fontSize="xl" fontWeight="semibold">
              ETH
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
                        <Input placeholder="$0.00" isDisabled={loading} value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} />
                    </FormControl>
                    <Button colorScheme="green" isLoading={loading} onClick={handleDepositClick}>Deposit +</Button>
                </Stack>
                <Stack direction="row" spacing={3} width="full" alignItems="flex-end">
                    <FormControl id="withdrawAmount">
                        <FormLabel>Withdraw Amount</FormLabel>
                        <Input placeholder="$0.00" isDisabled={loading} value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} />
                    </FormControl>
                    <Button colorScheme="red" isLoading={loading} onClick={handleWithdrawClick}>Withdraw -</Button>
                </Stack>
            </Flex>
          </Flex>
        </Box>
      );
    }   
  
      
  
  export default Balance;
  