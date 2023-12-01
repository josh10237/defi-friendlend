import { FormLabel,
    Text, 
    CircularProgress, 
    CircularProgressLabel, 
    Flex, 
    Center, 
    Button, 
    Input, 
    InputLeftAddon, 
    InputGroup, 
    useStatStyles
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Loan({ loan , onContribute }) {

    const portionFilled = Math.trunc(loan.filled / loan.amount * 100)
    const dispatch = useDispatch()
    const members = useSelector((state) => state.member.members)
    const [borrower, setBorrower] = useState({})
    const [contributeAmount, setContributeAmount] = useState(0)

    useEffect(() => {
        const borrowerFilt = members.filter((m) => parseInt(m.memberAddress, 16) === loan.borrower)
        if (borrowerFilt.length === 1) {
            setBorrower(borrowerFilt[0])
        }
        // eslint-disable-next-line
    }, [])
    console.log(borrower)
    
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
                <Text>{borrower?.username}</Text>
            </Flex>

            <Flex justify={'space-between'} 
                marginLeft={textMargin}
                marginRight={textMargin}
            >
                <Text>FriendLend Score</Text>
                <Text>{borrower?.friendScore}</Text>
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
                <Text>Filled</Text>
                <Text>${loan.filled}</Text>
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
                <Text>{loan.interest}</Text>
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
                    <Input placeholder="Enter Amount"
                    onChange={(e) => setContributeAmount(e.target.value)}
                    ></Input>
                </InputGroup>
                <Button mr={'10px'} colorScheme={'green'}
                    onClick={() => onContribute(loan, contributeAmount)}
                >
                    Contribute
                </Button>
            </Center>
            
            
            


        </Flex>
    )
}

export default Loan