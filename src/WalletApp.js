import React, { useState } from "react";
import './App.css';
import WalletCard from './WalletConnect';
import TransferToken from './Transfer';
import { ethers } from 'ethers';
import {
    Box,
    Button,
    Text,
    Image,

} from '@chakra-ui/react';
import {
    Flex,
    Menu,
    MenuButton,
    MenuList, Icon,
    MenuItem,
} from '@chakra-ui/react';

import { SearchIcon, ChevronDownIcon, TriangleDownIcon, ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons'
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
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
        rpcUrls: ["https://bsc-dataseed.binance.org"],
        blockExplorerUrls: ["https://bscscan.com"]
    },
    avalanche: {
        chainId: `0x${Number(43114).toString(16)}`,
        chainName: "Avalanche",
        nativeCurrency: {
            name: "AVAX",
            symbol: "AVAX",
            decimals: 18
        },
        rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
        blockExplorerUrls: ["https://snowtrace.io"]
    },
    ethereum: {
        chainId: `0x${Number(1).toString(16)}`,
        chainName: "Ethereum Mainnet",
        nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: 18
        },
        rpcUrls: ["https://rpc.ankr.com/eth"],
        //rpcUrls: ["https://api.mycryptoapi.com/eth"],
        blockExplorerUrls: ["https://etherscan.io"]
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
    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    const [connButtonText, setConnButtonText] = useState('Connect to Wallet');
    const [chainId, setChainID] = useState(null);
    const CHAINIDS = {
        1: "Ethereum",
        3: "Ropsten Test Network",
        4: "Rinkeby-testnet",
        5: "Goerli Test Network",
        42: "Kovan Test Network",
        56: "BSC",
        43114: "Avalanche",
        137: "Matic"
    };
    const connectWalletHandler = () => {
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(result => {
                    accountChangedHandler(result[0]);
                })
        }
        else {
            setErrorMessage('Install MetaMask');
        }
    }
    const accountChangedHandler = (newAccount) => {
        setConnButtonText('Connected');
        setDefaultAccount(newAccount.substring(38, 42));
        getUserBalance(newAccount);
    }
    const getUserBalance = (address) => {
        window.ethereum.request({ method: 'eth_getBalance', params: [address, 'latest'] })
            .then(balance => {
                setUserBalance(ethers.utils.formatEther(balance).substring(0, 6));
            })
        setChainID(window.ethereum.networkVersion);
    }

    const getCurrentChainID = (chainId) => {
        let chain = CHAINIDS[chainId];
       if(chain) {
        const currentChain = chain.toLowerCase();
        sessionStorage.setItem("activeChain", currentChain);
        }
        return CHAINIDS[chainId];

    }
    const chainChangedHandler = () => {
        window.location.reload();
    }
    window.ethereum.on('accountsChanged', accountChangedHandler);
    window.ethereum.on('chainChanged', chainChangedHandler);
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
                        rightIcon={<TriangleDownIcon boxSize={'10px'} />}
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
                        <Flex>
                        <Text fontSize='x-small' width={"100%"}> {getCurrentChainID(chainId)}
                            {connectWalletHandler()}
                            </Text>
                        </Flex>
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => handleNetworkSwitch("polygon")}>
                            <Text fontSize='xs'> Polygon </Text> </MenuItem>
                        <MenuItem onClick={() => handleNetworkSwitch("bsc")}>
                            <Text fontSize='xs'> BSC </Text> </MenuItem>
                        <MenuItem onClick={() => handleNetworkSwitch("avalanche")}>
                            <Text fontSize='xs'> Avalanche </Text> </MenuItem>
                        <MenuItem onClick={() => handleNetworkSwitch("ethereum")}>
                            <Text fontSize='xs'> Ethereum </Text> </MenuItem>
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
                            leftIcon={<ArrowUpIcon position='absolute' left='8px' bottom='6px' color={'#cc703c'} />} >
                            <CircleIcon boxSize={4} color='white' margin='0px 3px 0px -10px' />
                            <Text color={"white"}> Send </Text>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent zIndex={4} marginLeft='20px'>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Transfer ETH Payment!</PopoverHeader>
                        <PopoverBody> <TransferToken /></PopoverBody>
                    </PopoverContent>
                </Popover>
                <Button size='xs' borderColor={'#cc703c'}
                    bgColor={"white"}
                    variant={"outline"}
                    leftIcon={<ArrowDownIcon position='absolute' left='8px' bottom='6px' color={'white'} />} >
                    <CircleIcon boxSize={4} color='#cc703c' margin='0px 3px 0px -10px' />
                    <Text color={"#cc703c"}> Receive </Text>
                </Button>

            </Flex>
        </Flex>


    );
}