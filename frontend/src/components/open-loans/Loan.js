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
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Loan({ loan , onContribute }) {

    const portionFilled = Math.trunc(loan.filled / loan.amount * 100)
    const members = useSelector((state) => state.member.members)
    const currentUser = useSelector((state) => state.member.currentUser)
    const [borrower, setBorrower] = useState({})
    const [contributeAmount, setContributeAmount] = useState(0)
    const [disableContribute, setDisableContribute] = useState(false)
    const [loading, setLoading] = useState(false)

    // convert date to date string
    // const date = new Date(loan.dueDate);
    // const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(loan.dueDate).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
    useEffect(() => {
        const borrowerFilt = members.filter((m) => {
            return (m.memberAddress === loan.borrower)
        })
        if (borrowerFilt.length === 1) {
            setBorrower(borrowerFilt[0])
            setDisableContribute(borrowerFilt[0].memberAddress === currentUser.memberAddress)
        }
        // eslint-disable-next-line
    }, [members])
    
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
                    Loan: {loan.id}
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
                <Text>{formattedDate}</Text>
            </Flex>

            <Flex justify={'space-between'} 
                marginLeft={textMargin}
                marginRight={textMargin}
            >
                <Text>Interest</Text>
                <Text>{loan.interest}%</Text>
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
                    isDisabled={loading}
                    ></Input>
                </InputGroup>
                <Button mr={'10px'} colorScheme={'green'}
                    onClick={async () => {
                        setLoading(true)
                        await onContribute(loan, contributeAmount)
                        setContributeAmount('')
                        setLoading(false)
                    }}
                    isDisabled={disableContribute}
                    isLoading={loading}
                >
                    Contribute
                </Button>
            </Center>
        </Flex>
    )
}

export default Loan