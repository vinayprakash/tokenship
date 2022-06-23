import React, { useState } from 'react';
import {
    Box,Flex,Text,Button}
    from '@chakra-ui/react'
import { kMaxLength } from 'buffer';

const Pagination = ({ postsPerPage, totalPosts, paginate, navigate, currentPage }) => {

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <Flex >
        <Flex margin={'15px'}>
      
      {/* <ul className='pagination'> */}
      <Button size={'xs'} bgColor='white' key={'previous'} className='page-item'>
            <a onClick={() => navigate(0)}>
              <Flex border='1px' h='20px' w='20px' justifyContent={'center'}  
              bgColor='#ffffff' color='#d3814f'> <Text fontSize='x-small' marginTop={'2px'}
              > {'<'}</Text> </Flex>
            </a>
          </Button>
        {pageNumbers.slice(currentPage>2 ? currentPage-1 : currentPage-1, currentPage < pageNumbers.length ? currentPage+1 : currentPage,).map(number => (
          <Button size={'xs'} bgColor='white' key={number} >
            <a onClick={() => paginate(number)}>
              <Flex border='1px' h='20px' w='20px' justifyContent={'center'}  
              bgColor={ number === currentPage ? '#d3814f': '#ffffff'} color= {currentPage === number ? '#ffffff': '#d3814f'}> <Text fontSize='x-small' marginTop={'2px'}
              > 
              {number}
              </Text> </Flex> 
            </a>
          </Button>
        ))}
        <Button size={'xs'} bgColor='white' key={'dot'} >
            <a>
              <Flex border='1px' h='20px' w='20px' justifyContent={'center'}  
              bgColor='#ffffff' color= '#d3814f'> <Text fontSize='x-small' marginTop={'2px'}
              > 
              {'...'}
              </Text> </Flex> 
            </a>
          </Button>
          <Button size={'xs'} bgColor='white' key={'last'} >
            {/* <a onClick={() => paginate(pageNumbers.length-1)}> */}
              <Flex border='1px' h='20px' w='20px' justifyContent={'center'}  
              bgColor={ pageNumbers.length-1 === currentPage ? '#d3814f': '#ffffff'} color= {currentPage === pageNumbers.length-1 ? '#ffffff': '#d3814f'}> <Text fontSize='x-small' marginTop={'2px'}
              > 
              {currentPage!==pageNumbers[pageNumbers.length-1] ? pageNumbers[pageNumbers.length-1]: '<'}
              </Text> </Flex> 
            {/* </a> */}
          </Button>
        <Button size={'xs'} bgColor='white' key={'next'} className='page-item'>
            <a onClick={() =>  navigate(1)}>
              <Flex border='1px' h='20px' w='20px' justifyContent={'center'}  
              bgColor='#ffffff' color='#d3814f'> <Text fontSize='x-small' marginTop={'2px'}
              > {'>'} </Text> </Flex>
            </a>
          </Button>
      {/* </ul> */}
    </Flex>
          
    </Flex>
  );
};

export default Pagination;