import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer, Flex, Button, Image, Text, Box, Icon, leftIcon, color
} from '@chakra-ui/react'
import { BsFillArrowDownRightCircleFill } from "react-icons/bs";
// import {
//   IoBriefcase
// } from 'react-icons/fi';
import { FaBriefcase } from "react-icons/fa";
import App from './App'



import { UpDownIcon, TriangleDownIcon, ArrowUpIcon, TriangleUpIcon } from '@chakra-ui/icons'
import Asset from './Asset'
import Pagination from './Pagination';
import {
  FiBriefcase
} from 'react-icons/fi';

function AssetData() {
  const [data, setData] = useState([])
  const [currentPosts, setCurrentPosts] = useState([]);
  const [sortkey, setSortkey] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(1);
  const [CurrentWorth, setCurrentWorth] = useState();
  const [Qty, setQty] = useState();
  const [URL,setUrl] = useState();
  const [chainnamenew,setChainName]=useState();
  const [walletaddressnew,setWalletAddress]=useState();

  const paginate = pageNumber => { setCurrentPage(pageNumber) };
  const navigate = (direction) => {
    if (direction === 0 && currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 1 && currentPage !== Math.ceil(data.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
    var walletaddress = sessionStorage.getItem("walletaddress");
    var chainname = sessionStorage.getItem("activeChain");
    setChainName(chainname);
    setWalletAddress(walletaddress);
    let URL = "";
    if(walletaddress && chainname){
      URL = `https://api.unmarshal.com/v1/${chainname}/address/${walletaddress}/assets?auth_key=wKV8eggPIV465Yu6isLDR7HtpO66ysQt9iCpo40D`;
      setUrl(URL);
    }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let URL = "";
      if(walletaddressnew && chainnamenew){
        URL = `https://api.unmarshal.com/v1/${chainnamenew}/address/${walletaddressnew}/assets?auth_key=wKV8eggPIV465Yu6isLDR7HtpO66ysQt9iCpo40D`;
        setUrl(URL);
      }
  }, [chainnamenew, walletaddressnew]);

  useEffect(() => {
    sort();
  }, [sortkey]);

  useEffect(() => {
    fetchData();
  }, [URL]);

  useEffect(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    setCurrentPosts(data.slice(indexOfFirstPost, indexOfLastPost));
  }, [data, currentPage]);

  const fetchData = () => {
    fetch(URL)
      .then((res) =>
        res.json())
      .then((response) => {
        setData(response);
        var CurrentWorth = [];
        response.map(item => {
          console.log(item);
          const num = `${(item.quote_rate * ethers.utils.formatEther(item.balance))}`
          CurrentWorth.push(Number(num))
          var result = CurrentWorth.reduce((x, y) => x + y);
          setCurrentWorth(result);
        })
        const Quantity = CurrentWorth.length
        setQty(Quantity)
      })
      
  }
 
  const sort = () => {
    const sorteddata = currentPosts.sort(compare);
    setCurrentPosts([...sorteddata]);
  }
  function compare(a, b) {
    if (a[`${sortkey}`] < b[`${sortkey}`]) {
      return -1;
    }
    if (a[`${sortkey}`] > b[`${sortkey}`]) {
      return 1;
    }

    return 0;
  }

  function percentage(quoteRate, quoteRate24H) {

    if (quoteRate === 0 || quoteRate24H === 0) {
      return 0;
    }
    return (quoteRate24H / quoteRate * 100).toFixed(2);

  }
  return (
    <App>
    <Flex direction={'column'} w='100%'>
      <Flex marginLeft={'2%'} border={'1px'} borderColor='gray.200'
         paddingLeft={'2%'} marginTop='2%' w='450px'>
        <Flex direction={'column'} >
          <Flex margin={'10px 0px 10px 0px'}>
            <Icon color={'#008cf1'} w='25px' h='20px'
              bgColor={'#dff0fd'} paddingTop='2px' paddingLeft={'2px'}
            >
              <FaBriefcase size={'20px'} />
            </Icon>
          </Flex>
          <Flex w='120px' borderRight={'1px'} borderColor='gray.200'>
            <Box boxSize={'100px'} h='70px' marginTop={'10px'}>
              <Flex >
                <Text fontSize={'15px'} fontWeight='light' fontFamily={'body'}
                fontStyle=''> All Asset value</Text>
              </Flex>
              <Flex>
                <Text fontSize={'larger'} fontWeight='bold'> ${CurrentWorth?.toFixed(2)} </Text>
              </Flex>
            </Box >
          </Flex>
        </Flex>
        <Flex w='100px' justifyContent='center'
          marginTop={'37px'} >
          <Box boxSize={'100px'} h='50px' w='max-content' marginTop={'20px'}>
            <Flex >
              <Text fontSize={'12px'} fontWeight='normal' fontFamily={'body'}> Invested </Text>
            </Flex>
            <Flex>
              <Text fontSize={'larger'} fontWeight='bold'> {Qty} </Text>
            </Flex>
          </Box >
        </Flex>
        <Flex w='100px' justifyContent='center'
          marginTop={'37px'}>
          <Box boxSize={'100px'} h='50px' w='max-content' marginTop={'20px'}>
            <Flex >
              <Text fontSize={'12px'} fontWeight='normal' fontFamily={'body'}> Total PL </Text>
            </Flex>
            <Flex>
              <Text fontSize={'larger'} fontWeight='bold'> {Qty} </Text>
            </Flex>
          </Box >
        </Flex>
      </Flex>
      <Flex direction={'column'} w='100%'>
        <Flex marginLeft={'2%'} border='1px' borderColor='gray.200' direction={'column'} paddingLeft='2%'
          marginTop={'2%'}>
          <Flex marginTop='1%'>
            <Text fontFamily={'heading'} fontSize='larger' fontWeight={'bold'}>
              My Tokens
            </Text>
          </Flex>


          <Flex marginTop={'3%'} marginBottom='2%' justifyContent={'space-between'}>
            <Flex>
              <Flex w='120px' borderRight={'1px'} borderColor='gray.200'>
                <Box boxSize={'100px'} h='50px' >
                  <Flex >
                    <Text fontSize={'10px'} fontWeight='normal' fontFamily={'body'}> Current Worth</Text>
                  </Flex>
                  <Flex>
                    <Text fontSize={'larger'} fontWeight='bold'> ${CurrentWorth?.toFixed(2)} </Text>
                  </Flex>
                </Box >
              </Flex>
              <Flex w='100px' borderRight={'1px'} borderColor='gray.200' justifyContent='center'>
                <Box boxSize={'100px'} h='50px' w='max-content'>
                  <Flex >
                    <Text fontSize={'10px'} fontWeight='normal' fontFamily={'body'}> Quantity </Text>
                  </Flex>
                  <Flex>
                    <Text fontSize={'larger'} fontWeight='bold'> {Qty} </Text>
                  </Flex>
                </Box >
              </Flex>
              <Flex w='120px' justifyContent={'center'} >
                <Box boxSize={'100px'} h='50px' w='max-content'>
                  <Flex >
                    <Text fontSize={'10px'} fontWeight='normal' fontFamily={'body'}> Invested </Text>
                  </Flex>
                  <Flex>
                    <Text fontSize={'larger'} fontWeight='bold'> ${CurrentWorth?.toFixed(2)} </Text>
                  </Flex>
                </Box >
              </Flex>
            </Flex>
            <Flex marginLeft={'10%'}>
              <Flex w='180px' h='40px' border={'1px'} borderColor='gray.200' marginRight='10px'>
                <Button w='100%' bgColor={'white'} leftIcon={<UpDownIcon h={'10px'} w={'10px'} />}
                  rightIcon={<TriangleDownIcon h={'12px'} w={'15px'} paddingLeft='5px' />}>
                  <Text fontSize={'sm'}
                    fontFamily='body'
                    fontStyle={'normal'}
                    fontWeight='semibold'> Balance </Text>
                  <Text fontSize={'10px'} fontWeight='normal' paddingLeft={'3px'}> (Low to High) </Text>
                </Button>
              </Flex>
              <Flex w='150px' h='40px' border={'1px'} borderColor='gray.200' marginRight={'15px'}>
                <Button w='100%' bgColor={'#d3814f'}
                  leftIcon={<BsFillArrowDownRightCircleFill position='absolute' left='8px' bottom='6px' color={'white'} />} >


                  <Text fontSize={'sm'} color='white'> Buy Token </Text>
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex marginLeft={'2%'}>
          <TableContainer w='100%'>
            <Table variant='simple' border={'1px'} borderColor='gray.200' w='100%'>
              <Thead bgColor={'gray.50'}>
                <Tr>
                  <Th>
                    Token
                    <Button
                      onClick={() => setSortkey('contract_ticker_symbol')}
                      rightIcon={<UpDownIcon h={'10px'} w={'7px'} border='0px' />}
                      h='15px' w='5px' bgColor={'gray.50'}>
                    </Button>
                  </Th>
                  <Th >
                    Name
                    <Button
                      onClick={() => setSortkey('contract_name')}
                      rightIcon={<UpDownIcon h={'10px'} w={'7px'} border='0px' />}
                      h='15px' w='5px' bgColor={'gray.50'}>
                    </Button>
                  </Th>
                  <Th>
                    Price
                    <Button
                      onClick={() => setSortkey('quote_rate')}
                      rightIcon={<UpDownIcon h={'10px'} w={'10px'} border='0px' />}
                      h='15px' w='5px' bgColor={'gray.50'}>
                    </Button>
                  </Th>
                  <Th>
                    Balance
                    <Button
                      onClick={() => setSortkey('balance')}
                      rightIcon={<UpDownIcon h={'10px'} w={'10px'} border='0px' />}
                      h='15px' w='5px' bgColor={'gray.50'}>
                    </Button>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {currentPosts.map((item) => (
                  <Tr key={item.contract_ticker_symbol} h='30px'>
                    <Td>
                      <Flex display={'flex'}><Image src={item.logo_url} h='20px' w='20px' marginRight={'10px'} />
                        {item.contract_ticker_symbol} </Flex></Td>
                    <Td>{item.contract_name}</Td>
                    <Td> <Flex display={'flex'}> ${item.quote_rate?.toFixed(2)}
                      <Text display={'flex'} fontSize='xs' paddingLeft={'15px'} alignItems='center'> {Number(item.quote_rate_24h) < 0 ? <TriangleDownIcon color={'red'} /> : <TriangleUpIcon color={'green'} />}
                        {Number(item.quote_rate_24h) < 0 ? <Text color={'red'}> {percentage(item.quote_rate, Number(item.quote_rate_24h))}%  </Text> : <Text color={'green'}> {percentage(item.quote_rate, Number(item.quote_rate_24h))}%</Text>} </Text> </Flex></Td>
                    <Td>
                      <Flex display={'flex'}>${(item.quote_rate * ethers.utils.formatEther(item.balance))?.toFixed(2)} <Text display={'flex'} fontSize='xs' paddingLeft={'15px'} alignItems='center'> {Number(item.quote_rate_24h) < 0 ? <TriangleDownIcon color={'red'} /> : <TriangleUpIcon color={'green'} />}
                        {Number(item.quote_rate_24h) < 0 ? <Text color={'red'}> {percentage(item.quote_rate, Number(item.quote_rate_24h))}%  </Text> : <Text color={'green'}> {percentage(item.quote_rate, Number(item.quote_rate_24h))}%</Text>} </Text> </Flex>
                      <Text fontSize='xs'> {ethers.utils.formatEther(item.balance)}  {item.contract_ticker_symbol}</Text>
                    </Td>
                  </Tr>
                ))}
              </Tbody>

            </Table>
          </TableContainer>
        </Flex>
        <Flex w='200px' marginLeft={'950px'}>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={data.length}
            paginate={paginate}
            navigate={navigate}
            currentPage={currentPage}
          />
        </Flex>
      </Flex>
    </Flex>
    </App>
  );
}

export default AssetData;
