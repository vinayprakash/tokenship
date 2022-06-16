import React, {useState, useEffect} from 'react'
import {ethers} from 'ethers';
import {
    Text,
    
    Button,
    Flex,

    Container,useColorMode
  } from '@chakra-ui/react';
  import { SearchIcon,ChevronDownIcon,TriangleDownIcon } from '@chakra-ui/icons'



const WalletCard = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    const [connButtonText, setConnButtonText] = useState('Connect to Wallet');
    const [chainId, setChainID] = useState(null);
    useEffect(()=>{
        connectWalletHandler()
    })
    const CHAINIDS = {
        1: "Ethereum Main Network",
        3: "Ropsten Test Network",
        4: "Rinkeby Test Network",
        5: "Goerli Test Network",
        42: "Kovan Test Network",
        56: "Binance smart chain Mainnet",
        43114 : "Avalanche",
        137 : "Polygon"
      };
    const connectWalletHandler = () => {
        if (window.ethereum) {
            window.ethereum.request({method : 'eth_requestAccounts'})
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
        setDefaultAccount(newAccount.substring(38,42));
        getUserBalance(newAccount);
    }
    const getUserBalance = (address) => {
        window.ethereum.request({method : 'eth_getBalance', params : [address, 'latest']})
        .then(balance => {
            setUserBalance(ethers.utils.formatEther(balance).substring(0,6));
        })
         setChainID(window.ethereum.networkVersion);
    }
    
    const getCurrentChainID = (chainId) => {
        return CHAINIDS[chainId];
    }
    const chainChangedHandler = () => { 
         window.location.reload();
    }
    window.ethereum.on('accountsChanged', accountChangedHandler);
    window.ethereum.on('chainChanged', chainChangedHandler);
    const {colorMode, toggleColorMode }=useColorMode();
    return (
        <Flex direction={"column"} width={"100%"} padding={'0px'}>

<Container maxW='2xl'padding={'0px'}>

<Flex > 
<img src='https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg' width={"30px"}
height={"30px"}/>
<div style={{'width':'67%'}}>
    <Text fontSize={'xs'}> **** **** {defaultAccount}</Text> 
    <Text fontSize={'xs'}> $ {userBalance} </Text>

</div>
<Button onClick={()=>connectWalletHandler} 
        size='xs'
        height='15px'
        width='15px'
        margin={"5px"}
        
        rightIcon={<TriangleDownIcon color={"#cc703c"} />}>
</Button>

</Flex>
        
        {errorMessage}
             
        </Container>
        </Flex>
    )
}
export default WalletCard;