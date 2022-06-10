import React from "react";
import Web3 from "web3/dist/web3.min";
import { useState, useEffect } from "react";
import {Box, Button, Flex, Heading, Input, Icon, Image} from '@chakra-ui/react';
import {SearchIcon} from "@chakra-ui/icons"
// import { useSelector } from "react-redux";
// import userEvent from "@testing-library/user-event";



// const provider = "https://mainnet.infura.io/v3/27af3e6f4d9d45e6ac1a6bf497a6e278";
const provider = "https://mainnet.infura.io/v3/70f77bb93e204c7e96a4a3df80767689";
// const provider ="https://mainnet.infura.io/v3/b373051775cd4c65a9fb9eeb34e16795";

const Web3Client = new Web3(new Web3.providers.HttpProvider(provider));
const minABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
];
function TokBal() {
  const [view,setView] = useState(false);
  const [viewAll, setViewAll] = useState('View All');
  const [amount, setAmount] = useState([]);
  const [amnt, setAmnt] = useState([]);
  
  const [addresses,setAddress]= useState([]);
  const [balanceListist,setBalanceList]= useState([]);
  const [filteredList,setFilteredList]= useState(balanceListist);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const walAddress = "0xfC43f5F9dd45258b3AFf31Bdbe6561D97e8B71de"; // ethereum data address

  // var walAddress ;
  const [q, setQ] = useState("");

  const [searchParam] = useState(["capital", "name"]);

        useEffect(() => {
            // our fetch codes
        }, []);

  ///////////////
  const connectWalletHandler = () => {
    if (window.ethereum) {
        window.ethereum.request({method : 'eth_requestAccounts'})
        .then(result => {
            accountChangedHandler(result[0]);
        })
    }
    else {
        console.log("Install metamask")
    }
}
const accountChangedHandler = (newAccount) => {
  setDefaultAccount(newAccount);
    // walAddress = newAccount;
    // console.log(walAddress);
  
}
///////////////

    console.log(walAddress)
    useEffect(() => {
      const getAnswer= async () => {
      const res = await fetch("https://wispy-bird-88a7.uniswap.workers.dev/?url=http://tokenlist.zerion.eth.link");
      const json = await res.json();
      let addresses = json.tokens.map((token) => (
        {address:token.address,name:token.name,decimal:token.decimals}
        ));
     setAddress(addresses)
     
  };

  getAnswer();

  },[])

  const getContractData = async (address) => {
    const contract = new Web3Client.eth.Contract(minABI, address.address);
    const balance = await contract.methods.balanceOf(walAddress).call();
    console.log(balance.length);
    const format = Web3Client.utils.fromWei(balance);
    const amount = parseFloat(format).toFixed(2)
   return {'bal':amount,'name':address.name,'decimal':address.decimals};
   setBalanceList(amnt);
   filteredList(amnt);
  }
  console.log(balanceListist)
  // console.log(WalletCard.address)
  useEffect(()=>{
    
        const getData = () => {
        addresses.forEach((address) => {
         getContractData(address).then(respose => {
            Number(respose.bal) > 0 && 
            setBalanceList(prev =>([
            ...prev,
            {...respose}
            ]))
        });
        });
        }
 
   addresses.length > 0 && getData();    
  },[addresses])

  
        const sliceBalance=()=>{
          setView(!view)
          console.log(viewAll);
          if(viewAll==='View All'){
            setViewAll("View Less")
          }
          else {
            setViewAll("View All")
          }
          
        }

  useEffect(() =>{
      connectWalletHandler();
  })

  useEffect(()=>{
    
      console.log("newList :",balanceListist)
      //setFilteredList(newList);
  },[balanceListist])
  console.log(view)

  
 
  window.ethereum.on('accountsChanged', accountChangedHandler);

  
  function search(items) {
    //const {balanceListist, q} = this.state;
    if(q==="")
    {
      setFilteredList(balanceListist);
    }
    else{
      const list = filteredList.filter(item => item.name.toLowerCase().indexOf(q.toLowerCase()) > -1 );
      setFilteredList(list);
    }
    

}
  
  return (  
    <div className="App" style={{'border': 'groove','width': '400px','width':'450px','maxHeight':'800px','overflowY':'scroll'}}>
      <Box width = '450px' >
        <div style={{'padding':'30px','background':'#F8F9F9'}}>
        <Flex className="myTokens" >
        <Heading size='md'>My Tokens</Heading>
        </Flex>
        <Flex className="noOfTokens" justifyContent='space-between' >
        <Heading fontSize='40px'>
          {balanceListist.length}
          </Heading>
        <Flex direction='column' textAlign='left'>
        <Heading fontSize='22px' fontWeight='semibold' color='GrayText'>$77,485</Heading>
        <Heading fontSize='12px' fontWeight='light'> 1.2% last 1 week</Heading>
        </Flex>
        </Flex>
        </div>
        
      
      <div>
      <div style={{'padding':'20px', 'position':'relative'}}>
      {/* <input type="search" name="search-form" id="search-form" className="search-input" placeholder="Search for..." value={q} onChange={search} 
style={{'border':'1px solid #b6adad', 'textAlign' : 'left', 'width': '102%', 'border-radius': '4px', 'padding' :'5px'}}></input> */}
      <input type="search" name="search-form" id="search-form" className="search-input" placeholder="Search for..." 
                              
                              //  onChange={(e) => setQ(e.target.value)
                                  onChange={(e) => setQ(e.target.value)}  style={{'border':'1px solid #b6adad', 'textAlign' : 'left', 'width': '102%', 'border-radius': '4px', 'padding' :'5px'}} ></input>
      <Icon as={SearchIcon} position='absolute' top ='31px' right='42px' onClick = {search}/>
    </div>
      </div>   
       {
        
    view?
    filteredList.map(item=>(
        <div id="listdiv">
          <Flex  justifyContent={"space-between"} margin = '22px 15px'>
            <Flex width={"40%"} overflow="hidden" whiteSpace={"nowrap"}>
              <Image src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880" boxSize='30px'/>
              <Flex direction='column' alignItems='flex-start'> 
              <Heading id="itemName" size='sm' color='black' >{item.name}</Heading>
              <div>
                <Heading fontSize='10px' fontWeight='light'>Qty: {item.bal}</Heading>
              </div>
              <div>
                <Heading fontSize='x-small' fontWeight='light' >Ethereum</Heading>
              </div>
              </Flex>
           </Flex>
          <Flex style={{'justifyContent':'right'}} overflow={"hidden"}><Heading size='xs' fontWeight='medium' >${item.bal}</Heading></Flex>
          {/* <Flex width={"40%"} overflow={"hidden"}>{item.decimal}</Flex> */}
          </Flex>
          {/* <h1>{item.name}</h1>
          <p>{item.bal}</p> */}
        </div>
      )):
      filteredList.slice(0,8).map(item=>(
        <div id="listdiv">
          <Flex justifyContent={"space-between"} margin = '22px 15px'>
            <Flex width={"40%"} overflow="hidden" whiteSpace={"nowrap"}>
            <Image src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880" boxSize='30px'/>
            <Flex direction='column' alignItems='flex-start' justifyContent='space-between'>
              <Heading id="itemName" size='sm' color='black' fontWeight={"medium"} >{item.name}</Heading>
              <div >
                <Heading  fontSize='10px' fontWeight='light'>Qty: {item.bal}</Heading>
              </div>
              <div>
                <Heading fontSize='x-small' fontWeight='light' >Ethereum</Heading>
              </div>
              </Flex>
            </Flex>
          <Flex style={{'justifyContent':'right'}} overflow={"hidden"}><Heading size='xs' fontWeight='medium'>${item.bal}</Heading></Flex>
          {/* <Flex width={"40%"} overflow={"hidden"}>{item.decimal}</Flex> */}
          </Flex>
          {/* <h1>{item.name}</h1>
          <p>{item.bal}</p> */}
        </div>
      ))}
      <div className="button">
      <Button colorScheme='cyan' variant='outline' id="submit" onClick={sliceBalance}>
        {viewAll}</Button>
      </div>
      </Box>
      </div>
)}

export default TokBal;