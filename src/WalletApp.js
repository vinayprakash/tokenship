import React, { useState } from "react";
import './App.css';
import WalletCard from './WalletConnect';
import TransferToken from './Transfer';
import {
    //ChakraProvider,
    Box,
    // Text,
    // //Link,VStack,Code,Grid,theme,Container,
    // Heading,
    Button,
    Text,
    Image,
    // ButtonGroup,
    // Stack,
    VStack,
    IconButton
    //,Circle
} from '@chakra-ui/react';
import {
    Flex,
    Menu,
    MenuButton,
    MenuList,Icon,
    MenuItem, Grid, GridItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
} from '@chakra-ui/react';

//import ChevronDownIcon from '@chakra-ui/icon';
import { SearchIcon, ChevronDownIcon, TriangleDownIcon, ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons'
//import Image from 'Desktop/Crypto-BG-Pic.png'
//import ErrorMessage from './ErrorMessage';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
} from "@chakra-ui/react";
const CircleIcon = (props) => (
    <Icon viewBox='0 0 200 200' {...props}>
      <path
        fill='currentColor'
        d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
      />
    </Icon>
  )
const networks = {
    polygon: {
        chainId: `0x${Number(137).toString(16)}`,
        chainName: "Polygon Mainnet",
        nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18
        },
        rpcUrls: ["https://polygon-rpc.com/"],
        blockExplorerUrls: ["https://polygonscan.com/"]
    },
    bsc: {
        chainId: `0x${Number(56).toString(16)}`,
        chainName: "Binance Smart Chain Mainnet",
        nativeCurrency: {
            name: "Binance Chain Native Token",
            symbol: "BNB",
            decimals: 18
        },
        rpcUrls: [
            "https://bsc-dataseed1.binance.org",
            "https://bsc-dataseed2.binance.org",
            "https://bsc-dataseed3.binance.org",
            "https://bsc-dataseed4.binance.org",
            "https://bsc-dataseed1.defibit.io",
            "https://bsc-dataseed2.defibit.io",
            "https://bsc-dataseed3.defibit.io",
            "https://bsc-dataseed4.defibit.io",
            "https://bsc-dataseed1.ninicoin.io",
            "https://bsc-dataseed2.ninicoin.io",
            "https://bsc-dataseed3.ninicoin.io",
            "https://bsc-dataseed4.ninicoin.io",
            "wss://bsc-ws-node.nariox.org"
        ],
        blockExplorerUrls: ["https://bscscan.com"]
    }
};
const changeNetwork = async (networkName, setError) => {
    try {
        if (!window.ethereum) throw new Error("No crypto wallet found");
        await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
                {
                    ...networks[networkName]
                }
            ]
        });
    } catch (err) {
        setError(err.message);
    }
};
export default function App() {
    const [error, setError] = useState(null);
    const handleNetworkSwitch = async (networkName) => {
        //setError();
        await changeNetwork(networkName, setError);
    };
    return (
        <Flex direction={"column"} width={'80%'} margin={'0 auto'}>
            <Flex><WalletCard /></Flex>
            <Flex>
            <Menu>
                                    <MenuButton as={Button} 
                                    size='xs' 
                                    rightIcon={<TriangleDownIcon boxSize={'10px'}/>} 
                                    margin={"10px 0px"} 
                                    width={'100%'}
                                    border='1px'
                                    borderColor='gray.200'
                                    borderStyle={'solid'}
                                    bgColor={'white'}>
                                    <Flex>
                                    <Box boxSize='15px' marginLeft={'15px'} marginBottom='-14px'>
                                        <Image src='https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880' alt='Dan Abramov' />
                                    </Box>
                                    </Flex>
                                        <Text fontSize='x-small' width={"100%"}> Ethereum </Text>
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem onClick={() => handleNetworkSwitch("polygon")}>
                                            <Text fontSize='xs'> Polygon </Text> </MenuItem>
                                        <MenuItem onClick={() => handleNetworkSwitch("bsc")}>
                                            <Text fontSize='xs'> BSC </Text> </MenuItem>
                                    </MenuList>
                                </Menu>
            </Flex>
            <Flex justifyContent={'space-between'} marginBottom='30px'>
            <Popover>
                                    <PopoverTrigger>
                                        <Button
                                            size="xs"
                                            bgColor={"#cc703c"}
                                            position='relative'
                                            leftIcon={<ArrowUpIcon position='absolute' left='8px' bottom='6px' color={'#cc703c'}/>} >
                                            <CircleIcon boxSize={4} color='white' margin='0px 10px 0px -10px'/>
                                            <Text color={"white"}> Send </Text>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent zIndex={4}>
                                        <PopoverArrow />
                                        <PopoverCloseButton />
                                        <PopoverHeader>Transfer ETH Payment!</PopoverHeader>
                                        <PopoverBody> <TransferToken /></PopoverBody>
                                    </PopoverContent>
                                </Popover>
                                <Button size="xs" borderColor={'#cc703c'} 
                                    bgColor={"white"}
                                    variant={"outline"}
                                    leftIcon={<ArrowDownIcon position='absolute' left='8px' bottom='6px' color={'white'}/>} >
                                    <CircleIcon boxSize={4} color='#cc703c' margin='0px 10px 0px -10px'/>
                                    <Text color={"#cc703c"}> Receive </Text>
                                </Button>
                           
            </Flex>
        </Flex>
            

    );
}
