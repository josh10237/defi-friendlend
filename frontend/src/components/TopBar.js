import React from "react";
import logo from './logo1.png';
import { Box, Flex, Image } from "@chakra-ui/react";

function TopBar() {
    return (
        <Flex 
            w="100%" 
            h="7vh" 
            bgGradient="linear(to top right, purple, blue)"
            align="center"
            justify="space-between"
        >
            <Image src={logo} alt="Logo FL" boxSize="10vh" ml="2vh" />
            <Box 
                flex="1" 
                textAlign="center" 
                color="white" 
                fontWeight="bold"
            >
                FRIENDLEND
            </Box>
            <Box boxSize="5vh" mr="2vh"/> {/* Placeholder for right alignment */}
        </Flex>
    )
}

export default TopBar;
