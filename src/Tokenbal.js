import React from "react";
import { ethers } from 'ethers';
import { useState, useEffect } from "react";
import {Box, Button, Flex, Heading, Icon, Image, Text} from '@chakra-ui/react';
import { SearchIcon} from '@chakra-ui/icons'

function TokBal() {
  const [view,setView] = useState(false);
  const [viewAll, setViewAll] = useState('View All');
  const [data, setData] = useState([])
  const [filteredList,setFilteredList]= useState([]);
  const [CurrentWorth, setCurrentWorth] = useState();
  const [Qty, setQty] = useState();
  const [chainName, setChainName] = useState(); 
  const [URL, setUrl] = useState("");
  // const chains =[ "ethereum", "bsc", "matic","celo", "avalanche" ,"xinfin", "zilliqa", "solana", "fantom", "bsc-testnet","matic-testnet","rinkeby-testnet"]
  const [q, setQ] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
    var walletaddress = sessionStorage.getItem("walletaddress");
    var activeChain = sessionStorage.getItem("activeChain");
    setChainName(activeChain);
    let URL = "";
    if(walletaddress && activeChain){
       URL = `https://api.unmarshal.com/v1/${activeChain}/address/${walletaddress}/assets?auth_key=wKV8eggPIV465Yu6isLDR7HtpO66ysQt9iCpo40D`;
      setUrl(URL);
    }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if(URL){
      fetchData();
    }
  }, [URL , chainName]);

  const fetchData =  () => {
       fetch(URL)
      .then((res) =>
        res.json())
      .then((response) => {
        setData(response);
        var CurrentWorth = [];
        response?.map(item => {
          const num = `${(item.quote_rate * ethers.utils.formatEther(item.balance))}`
          CurrentWorth.push(Number(num))
          var result = CurrentWorth.reduce((x, y) => x + y);
          setCurrentWorth(result);
        })
        const Quantity = CurrentWorth.length
        setQty(Quantity)
      })
     }

  useEffect(()=>{
    if(view){
      setViewAll("View Less");
     setFilteredList(data)
    } else {
      setViewAll("View More");
      setFilteredList(data.slice(0,6))
    }
    },[view]); 

  const sliceBalance=()=>{
    setView(!view)      
  }

      useEffect(()=>{
        setFilteredList(data.slice(0,6));
      },[data])
  
function search(items) {
    if(q==="")
    {
      setFilteredList(data.slice(0,6));
    }
    else{
      const list = data.filter(item => item.contract_name.toLowerCase().indexOf(q.toLowerCase()) > -1 );
      setFilteredList(list);
    }
    
}
function percentage(quoteRate, quoteRate24H) {

    if (quoteRate === 0 || quoteRate24H === 0) {
      return 0;
    }
    return (quoteRate24H / quoteRate * 100).toFixed(2);
  }
  
  return ( 
        <div className="App" style={{'border': 'groove','width':'100%','marginLeft':'10px'}}>
        <Box width = '100%' >
        <div style={{'padding':'30px','background':'#F8F9F9'}}>
        <Flex className="myTokens" >
        <Heading size='md'>My Tokens</Heading>
        </Flex>
        <Flex className="noOfTokens" justifyContent='space-between' >
        <Heading fontSize='40px'>
          {data.length}
          </Heading>
        <Flex direction='column' textAlign='left'>
        <Heading fontSize='22px' fontWeight='semibold' color='GrayText'>${CurrentWorth?.toFixed(2)}</Heading>
        <Heading fontSize='12px' fontWeight='light'> current value</Heading>
        </Flex>
        </Flex>
        </div>

      <div>
      <div style={{'padding':'15px', 'position':'relative'}}>
      <input type="search" name="search-form" id="search-form" className="search-input" placeholder="Search for..." 
      onChange={(e) => setQ(e.target.value)}  style={{'border':'1px solid #b6adad', 'textAlign' : 'left', 'width': '102%', 'border-radius': '4px', 'padding' :'10px'}} ></input>
      <Icon as={SearchIcon} position='absolute' top ='31px' right='42px' onClick = {search}/>
    </div>
      </div>
      <Flex direction={'column'} overflowY='scroll' maxHeight='480px' >
       {    
    filteredList?.map(item=>(
        <div id="listdiv">
          <Flex justifyContent={"space-between"} margin = '13px 15px' maxHeight={'700px'}>
            <Flex width={"60%"} overflow="hidden" whiteSpace={"nowrap"} > 
              <Image src={item.logo_url} boxSize='20px'/>
              <Flex direction='column' alignItems='flex-start' marginLeft='10px'> 
              <Heading id="itemName" size='sm' color='black' >{item.contract_name}</Heading>
              <div>
                <Heading fontSize='13px' fontWeight='light'>Qty: {Number(ethers.utils.formatEther(item.balance)).toFixed(4)}</Heading>
              </div>
              <div>
                <Heading fontSize='13px' fontWeight='light' >{chainName}</Heading>
              </div>
              </Flex>
           </Flex>
          <Flex style={{'justifyContent':'right'}} overflow={"hidden"} flexDirection ='column'> ${item.quote_rate?.toFixed(2)}
            <Heading size='xs' fontWeight='medium' ><Text display={'flex'} fontSize='xs' paddingLeft={'15px'} alignItems='center'> {Number(item.quote_rate_24h) < 0 }
            {Number(item.quote_rate_24h) < 0 ? <Text color={'red'}> {percentage(item.quote_rate, Number(item.quote_rate_24h))}%  </Text> : <Text color={'green'}> {percentage(item.quote_rate, Number(item.quote_rate_24h))}%</Text>} </Text></Heading>
          </Flex>
          </Flex>
          </div>
          
       
      ))}
       </Flex>
      <Flex left={'0'} right='0' margin={'3px'}>
      {data.length >= 7 ?
      <Button color='#cc703c' variant='outline' borderColor='#cc703c' id="submit" onClick={sliceBalance} width='100%'>
        {viewAll}</Button> : null}
      </Flex>
      </Box>
      </div>
)}

export default TokBal;