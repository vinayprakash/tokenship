import React, { useState, useEffect } from 'react';
import './App.css';
import {ethers} from 'ethers';
import App from './App';
import {Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableContainer,Flex,Button,Link,Icon,Image, Stack,} from '@chakra-ui/react';
import { ExternalLinkIcon,ArrowDownIcon,ArrowUpIcon,RepeatIcon,} from '@chakra-ui/icons';
import {FaSort} from 'react-icons/fa'

function ActivityData() {
    const [data, setData] = useState([])
    const [filterData, setFilterData] = useState([])
    const [sortkey, setSortkey]=useState('');
    const [pagenum, setPageNum] = useState(1);
    const [barfilter, setbarfilter] = useState('all');
    const [chainnamenew,setChainName]=useState();
    const [walletaddressnew,setWalletAddress]=useState();
    const [URL,setUrl] = useState();

    useEffect(() => {
      const timer = setTimeout(() => {
      var walletaddress = sessionStorage.getItem("walletaddress");
      var chainname = sessionStorage.getItem("activeChain");
      setChainName(chainname);
      setWalletAddress(walletaddress);
      let URL = "";
      if(walletaddress && chainname){
        URL = `https://api.unmarshal.com/v2/${chainname}/address/${walletaddress}/transactions?&page=${pagenum}&pageSize=5&auth_key=wKV8eggPIV465Yu6isLDR7HtpO66ysQt9iCpo40D`;
        setUrl(URL);
      }
      }, 1000);
      return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
      let URL = "";
        if(walletaddressnew && chainnamenew){
          URL = `https://api.unmarshal.com/v2/${chainnamenew}/address/${walletaddressnew}/transactions?&page=${pagenum}&pageSize=5&auth_key=wKV8eggPIV465Yu6isLDR7HtpO66ysQt9iCpo40D`;
          setUrl(URL);
        }
    }, [chainnamenew, walletaddressnew]);

    useEffect(() => {
      if(URL){
        fetchData()
      }
    },[URL]);
 
    useEffect(() => {
    fetchData()
    },[pagenum]);
    
    useEffect(() => {
    sort();
    },[sortkey]);  

    useEffect(() =>{
    cleanData();
    },[data, barfilter])

    const cleanData = () => {
      var arr = [];
      data.map((item)=>{
      const unixTime = item?.date;
      const currentTimestamp = new Date(unixTime*1000);
      let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(currentTimestamp) 
      let time = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' }).format(currentTimestamp)
    
    var obj = {
        id : item.id,
        date: date,
        time: time,
        from: `${item?.from?.slice(0,4)}****${item?.from?.slice(38,42)}`,
        to: `${item?.to?.slice(0,4)}****${item?.to?.slice(38,42)}`,
        event: item.type,
        receivedToken:item.received? item.received[0]?.symbol:"",
        sentToken: item.sent?item.sent[0]?.symbol:"",
        recvdtoken_logo: item.received? item.received[0]?.logo_url:"",
        senttoken_logo: item.sent? item.sent[0]?.logo_url:"",
        // receivedQuote: item.received?item.received[0]?.quote?item.received[0]?.quote:"":"",
        // sentQuote: item.sent?item.sent[0]?.quote?item.sent[0]?.quote:"":"",
        quote : item?.type==='receive'?   item?.received[0]?.quote  :item?.type==='send'?item.sent[0]?.quote :item?.type==='swap'?item.sent[0]?.quote : '',
        link : `https://bscscan.com/tx/${item?.id}`,
        sentvalue : item.value,
        receivedvalue : item.received? item.received[0]?.value:"",
    }
    arr.push(obj);
    });
   
    if(barfilter==='all')
    {  
      setFilterData(arr);
    }
    else if(barfilter==='send'||'receive'||'swap') 
    {
    const items = arr.filter(item => item.event.toLowerCase()==barfilter);
    setFilterData(items);
    } 
  }
    const fetchData = () => {
      if(URL){
        fetch(URL)
        .then((res) => res.json())
        .then((response) => {
        const newData = response.transactions;    
        setData([...data, ...newData]);
        })
      }
      
    }

    const sort=()=>{
    const sorteddata=filterData.sort(compare);
    setFilterData([...sorteddata]);
    }

    function compare( a, b ) {
    if ( a[`${sortkey}`] < b[`${sortkey}`] ){
      return -1;
    }
    if ( a[`${sortkey}`] > b[`${sortkey}`] ){
      return 1;
    }
    return 0;
  }

  //pagination
  const incrementpagenum =() => {
    setbarfilter('all');
    setPageNum(pagenum + 1);
  }

    return (
    <App>
    <Flex marginTop={'30px'} width='99%' > 
    <Flex width='100%' justifyContent='flex-end'>
    <Flex direction={'column'} width='100%' border='2px' borderColor='#e7e9ed' marginLeft='2%'>
        <Flex direction='column' >
        <Stack direction='row' spacing={4} align='center' paddingLeft='3px' height='90px'>
        <Button className={barfilter === "all" ? "active" : ''} textColor={'black'}  fontWeight='normal' _hover={{ bg: "#ee7a30d6" }} autoFocus='yes' bottom='4px' variant='outline' rounded='full' onClick={() => {setbarfilter('all')}}>All transactions</Button>
        <Button className={barfilter === "send" ? "active" : ''} textColor={'black'}  fontWeight='normal' _hover={{ bg: "#ee7a30d6" }} bottom='4px' variant='outline' rounded='full' onClick={() => {setbarfilter('send');}}>Sent</Button>
        <Button className={barfilter === "receive" ? "active" : ''} textColor={'black'}  fontWeight='normal' _hover={{ bg: "#ee7a30d6" }} bottom='4px' variant='outline' rounded='full' onClick={() => {setbarfilter('receive')}}>Received</Button>
        <Button className={barfilter === "swap" ? "active" : ''} textColor={'black'}  fontWeight='normal' _hover={{ bg: "#ee7a30d6" }} bottom='4px' variant='outline' rounded='full' onClick={() => setbarfilter('swap')}>Swap</Button>
        </Stack> 

    <TableContainer width='100%' border='0.5px black' borderStyle='groove' rounded='md'>
    <Table variant='simple'>
    <Thead>
      <Tr background='#fbfbfb'>
        <Th> <Button textColor={'black'} colorScheme='#fbfbfb' fontWeight='normal' onClick={() => setSortkey('date')}> Date <Icon as={FaSort}/> </Button></Th>
        <Th><Button textColor={'black'} colorScheme='#fbfbfb' fontWeight='normal' onClick={() => setSortkey('event')}>Event <Icon as={FaSort}/></Button></Th>
        <Th><Button textColor={'black'} colorScheme='#fbfbfb' fontWeight='normal'>Transaction </Button></Th>
        <Th><Button textColor={'black'} colorScheme='#fbfbfb' fontWeight='normal' onClick={() => setSortkey('quote')}>USD value <Icon as={FaSort}/></Button></Th>
        <Th> </Th>
      </Tr>
      </Thead>
      <Tbody>
      { 
      filterData.map((item ,i) => (
       <Tr key={i}>
      <Td>
        <Flex direction="column">
        <Flex>{item.date}</Flex>
        <Flex fontSize='12px' color='gray.500' fontWeight='normal'>{item.time}</Flex>
        </Flex>
      </Td>

        {
        item.event === 'receive'?
        <Td><Icon as={ArrowDownIcon} rounded='md' border='1px' padding='1px' borderColor='#e7e9ed' color="red.500"  width= '1.2em'height= '1.2em'/> Received</Td> 
        : item.event === 'send'?
        <Td><Icon as={ArrowUpIcon} rounded='md' border='1px' padding='1px'borderColor='#e7e9ed' color="red.500" width= '1.2em'height= '1.2em'/> Sent</Td> 
        : item.event === 'swap'?
        <Td><Icon as={RepeatIcon} rounded='md' border='1px' padding='1px' borderColor='#e7e9ed' color="red.500" width= '1.2em'height= '1.2em'/> swap</Td>: <Td>${item.event}</Td>
       }

       {
        item.event === 'receive'?
        <Td>
          <Flex>
          <Flex marginRight='30px'>
          <Flex direction='column'>
          <Flex fontSize='15px' color='gray.400' fontWeight='normal'>From</Flex>
          <Flex>{item.from}</Flex>
          </Flex>
          </Flex>
          <Flex marginLeft='40px'>
          <Flex direction='column'>
          <Flex fontSize='15px' color='gray.400' fontWeight='normal'>Tokens</Flex>             
          <Flex><Flex marginRight='10px'>{Number(ethers.utils.formatEther(item.receivedvalue)).toFixed(6)}</Flex><Image src={item.recvdtoken_logo} boxSize='20px'marginRight='5px' />{item.receivedToken}</Flex>
          </Flex>
          </Flex>
          </Flex>        
          </Td>

        :item.event === 'send'?
        <Td>
        <Flex>
        <Flex marginRight='40px' direction='column'>
        <Flex fontSize='15px' color='gray.400' fontWeight='normal'>To</Flex>
        <Flex>{item.to}</Flex> 
        </Flex>
        <Flex marginLeft='30px'>
        <Flex direction='column'> 
        <Flex fontSize='15px' color='gray.400' fontWeight='normal'>Tokens</Flex>  
        <Flex> <Flex marginRight='5px'>{Number(ethers.utils.formatEther(item.sentvalue)).toFixed(8)}</Flex>
        
        <Image src={item.senttoken_logo} boxSize='20px'marginRight='6px'/>{item.sentToken}</Flex>
        </Flex>
        </Flex> 
        </Flex>
        </Td>

        : item.event === 'swap'?
        <Td>
        <Flex>
        <Flex direction={'column'} marginRight='47px'>
        <Flex fontSize='15px' color='gray.400' fontWeight='normal'>From</Flex>
        <Flex marginRight='3px'>{Number(ethers.utils.formatEther(item.sentvalue)).toFixed(4)}<Image src={item.senttoken_logo} boxSize='20px'marginRight='5px' />{item.sentToken}</Flex>
        </Flex>
        <Flex  direction={'column'}marginLeft='1px'>
        <Flex marginLeft='1px' fontSize='15px' color='gray.400' fontWeight='normal'>To</Flex> 
        <Flex paddingLeft='1px'>{Number(ethers.utils.formatEther(item.receivedvalue)).toFixed(2)}
        <Image marginRight='5px' src={item.recvdtoken_logo} boxSize='20px'marginLeft='5px'/> {item.receivedToken?item.receivedToken:""}</Flex>   
        </Flex>
        </Flex>
        </Td> :<Td></Td>
        }
        <Td>{item.quote? item.quote : 0 }</Td>
        <Td><Link href={item.link} isExternal><Icon width= '1.2em' height= '1.2em'as={ExternalLinkIcon} color="red.500"/></Link></Td>
        </Tr>
        ))
        }
        </Tbody>
        </Table>
        </TableContainer>
        </Flex>{filterData.length > 6 ? <Button onClick={incrementpagenum}> Load More </Button> : ""}</Flex>
        </Flex>
        </Flex>
        </App>
        );
}
 
export default ActivityData;