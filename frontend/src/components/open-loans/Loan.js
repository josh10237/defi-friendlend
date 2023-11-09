import { Text, CircularProgress, CircularProgressLabel, Flex, Center, Button, Box, Input, InputLeftAddon, InputGroup } from "@chakra-ui/react";
import React from "react";

function Loan({loan}) {

    const portionFilled = loan.filled / loan.amount * 100
    
    // design constants
    const textMargin = '15px'

    return (
        <Flex 
            w={'300px'} 
            bg={'white'} 
            borderColor={'lightgrey'}
            borderWidth={'1px'}
            borderRadius={'15px'}
            direction={'column'}
            margin={'5px'}
            boxShadow={'base'}
        >
            <Center>
                <Text>Loan: {loan.borrower}</Text>
            </Center>
            <Center>
                <CircularProgress value={portionFilled} size={'100px'}>
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
                    margin={'5px'}
                    w={'15vw'}
                >
                    <InputLeftAddon>$</InputLeftAddon>
                    <Input placeholder="Enter Amount"></Input>
                </InputGroup>
                <Button margin={'5px'} bg={'lightgreen'}>
                    Contribute
                </Button>
            </Center>
            
            
            


        </Flex>
    )
}

export default Loan