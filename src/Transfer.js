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
    // {/* <form className="m-4" onSubmit={handleSubmit}>
    //   <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
    //     <main className="mt-4 p-4">
    //       <h1 className="text-xl font-semibold text-gray-700 text-center">
    //         Send ETH payment
    //         <p className="text-xl font-semibold text-gray-700 text-center"> 
    //         You can transfer from connected chain in metamask</p>
    //       </h1>
    //       <div className="">
    //         <div className="my-3">
    //           <input
    //             type="text"
    //             name="addr"
    //             className="input input-bordered block w-full focus:ring focus:outline-none"
    //             placeholder="Recipient Address"
    //           />
    //         </div>
    //         <div className="my-3">
    //           <input
    //             name="ether"
    //             type="text"
    //             className="input input-bordered block w-full focus:ring focus:outline-none"
    //             placeholder="Amount in ETH"
    //           />
    //         </div>
    //       </div>
    //     </main>
    //     <footer className="p-4">
    //       <button
    //         type="submit"
    //         className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
    //       >
    //         Pay now
    //       </button>
    //       {/* <ErrorMessage message={error} /> */}
    //       {/* <TxList txs={txs} />
    //     </footer>
    //   </div>
    // </form> 
    // </div>*/}
  );
}
