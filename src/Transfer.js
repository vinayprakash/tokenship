import { useState } from "react";
import { ethers } from "ethers";
import {
    Box,Container,Input,
    Button,Flex,Text,
  } from '@chakra-ui/react';
import { FormControl, FormLabel,GridItem } from '@chakra-ui/react';
import txs from './txs'
import ErrorMessage from "./Error";
import TxList from "./txs";

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

export default function App() {
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
    await startPayment({
      setError,
      setTxs,
      ether: data.get("ether"),
      addr: data.get("addr")
    });
  };


  return (
<form  onSubmit={handleSubmit} style={{width:'250px'}}>
      <Flex direction={"column"} width={"100%"} justifyContent={"flex-start"}>
      <Container maxW='sm' alignSelf={'flex-start'} marginTop={'10px'}  >
        <main >
          <div style={{marginLeft:'10px'}}>
            <div> 
              <Input size={'xs'}
              width='250px'height='50px' marginBottom='10px' border={'1px'}
              borderColor='#cd7139' 
                type="text"
                name="addr"
                placeholder="Recipient Address"
              />
            </div>
            <div>
              <Input size={'xs'} width='250px'height='50px' marginBottom='10px' border={'1px'}
              borderColor='#cd7139'
                name="ether"
                type="text"
                //className="input input-bordered block w-full focus:ring focus:outline-none"
                placeholder="Amount in ETH"
              />
            </div>
          </div>
        </main>
        <footer className="p-4">
          <Button size={'md'} bgColor='#cd7139' color={'white'}
            type="submit"
            className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
            >
            Pay now
          </Button>
          <ErrorMessage message={error} />
          {/* <TxList txs={txs} /> */}
        </footer>
        </Container>
      </Flex>
    </form>

  );
}
