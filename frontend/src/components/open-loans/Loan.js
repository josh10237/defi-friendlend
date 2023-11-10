import { FormLabel,
    Text, 
    CircularProgress, 
    CircularProgressLabel, 
    Flex, 
    Center, 
    Button, 
    Box, 
    Input, 
    InputLeftAddon, 
    InputGroup 
} from "@chakra-ui/react";

import React from "react";

function Loan({loan}) {

    const portionFilled = loan.filled / loan.amount * 100
    
    // design constants
    const textMargin = '15px'

    return (
        <Flex 
            w={'350px'}
            bg={'white'} 
            borderWidth={'1px'}
            borderRadius={'lg'}
            direction={'column'}
            margin={'5px'}
        >
            <Center>
                <FormLabel fontSize="xl" fontWeight="bold" ml={3} mt={3}>
                    Loan: {loan.borrower}
                </FormLabel>
            </Center>
            <Center>
                <CircularProgress value={portionFilled} size={'100px'} ringColor={'blue'}>
                    <CircularProgressLabel>
                        {portionFilled}%
                        </CircularProgressLabel>
                </CircularProgress>
            </Center>

            <Text marginLeft={textMargin} textColor={'gray'}>User Info</Text>

            <Flex justify={'space-between'} 
                marginLeft={textMargin}
                marginRight={textMargin}
            >
                <Text>Username</Text>
                <Text>Josh</Text>
            </Flex>

            <Flex justify={'space-between'} 
                marginLeft={textMargin}
                marginRight={textMargin}
            >
                <Text>FriendLend Score</Text>
                <Text>760</Text>
            </Flex>

            <Text 
            marginLeft={textMargin} 
            marginTop={textMargin}
            textColor={'gray'}>Loan Stats</Text>

            <Flex justify={'space-between'} 
                marginLeft={textMargin}
                marginRight={textMargin}
            >
                <Text>Amount</Text>
                <Text>${loan.amount}</Text>
            </Flex>

            <Flex justify={'space-between'} 
                marginLeft={textMargin}
                marginRight={textMargin}
            >
                <Text>Due Date</Text>
                <Text>{loan.dueDate}</Text>
            </Flex>

            <Flex justify={'space-between'} 
                marginLeft={textMargin}
                marginRight={textMargin}
            >
                <Text>Interest</Text>
                <Text>10%</Text>
            </Flex>

            <Flex justify={'space-between'} 
                marginLeft={textMargin}
                marginRight={textMargin}
            >
                <Text>Daily Rate</Text>
                <Text>2.5%</Text>
            </Flex>

            <Center
                bg={'gray'}
                h={'3px'}
                marginLeft={'15px'}
                marginRight={'15px'}
                marginTop={'5px'}
                marginBottom={'5px'}
            />

            <Center>
                <InputGroup
                    margin={'10px'}
                    w={'15vw'}
                >
                    <InputLeftAddon>$</InputLeftAddon>
                    <Input placeholder="Enter Amount"></Input>
                </InputGroup>
                <Button mr={'10px'} colorScheme={'green'}>
                    Contribute
                </Button>
            </Center>
            
            
            


        </Flex>
    )
}

export default Loan