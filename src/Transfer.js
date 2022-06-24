import { useState } from "react";
import { ethers } from "ethers";
//import ErrorMessage from "./Error";
//import TxList from "./txlst";
import {
    //ChakraProvider,
    Box,Container,Input,
    // Heading,
    Button,Flex,Text,
    // ButtonGroup,
    // Stack,
    VStack,
    IconButton,
    Heading
    //,Circle
  } from '@chakra-ui/react';
  import { FormControl, FormLabel,GridItem } from '@chakra-ui/react';

const startPayment = async ({ setError, setTxs, ether, addr }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether)
    });
    console.log({ ether, addr });
    console.log("tx", tx);
    setTxs([tx]);
  } catch (err) {
    setError(err.message);
  }
};

export default function TransferToken() {
  //const [error, setError] = useState();
  const [txs, setTxs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    //setError();
    await startPayment({
      //setError,
      setTxs,
      ether: data.get("ether"),
      addr: data.get("addr")
    });
  };

  return (

<Flex direction={"column"} width={"100%"} justifyContent={"flex-end"}>
            {/* </Flex><Flex justifyContent={"flex-end"}> */}
      <Container maxW='sm' alignSelf={'flex-end'} marginTop={'10px'}>
          {/* <Heading>
          Transfer ETH Payment
          </Heading> */}
          <GridItem colSpan={1}>
              <FormControl size={'smaller'}>
                  <FormLabel size={'smaller'}> 
                  <Text fontSize={"xs"}> Sender Address</Text></FormLabel>
                  <Input placeholder="Ox.. " bg='gray.200'/>
            </FormControl>
            </GridItem>
            <GridItem colSpan={1}>
              <FormControl>
                  <FormLabel> 
                  <Text fontSize={"xs"}> Amount in ETH </Text>
                  </FormLabel>
                  <Input placeholder="$32.00 " bg='gray.200'/>
                </FormControl>
            </GridItem>
            <GridItem colSpan={1} >
                <Button onClick={handleSubmit} size='sm' w='30%' bg='#cc703c'margin={"5px"}>
                    <Text color="white">Transfer </Text>
                </Button>
            </GridItem>
            {/* <TxList txs={txs} /> */}
      </Container>
      </Flex>
  );
}
