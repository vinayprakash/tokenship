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

  let page = [];
  if(Math.ceil(totalPosts / postsPerPage ) === currentPage) {
    page = [currentPage-2, currentPage-1];
  } else if(Math.ceil(totalPosts / postsPerPage ) - 1 === currentPage) {
    page = [currentPage-1, currentPage];
  } else {
    page = [ currentPage,currentPage+1];
  }
 
  return (
    <Flex >
        <Flex margin={'15px'}>
      
      {/* <ul className='pagination'> */}
      {pageNumbers.length > 2 && (<><Button size={'xs'} bgColor='white' key={'previous'} className='page-item'>
            <a onClick={() => navigate(0)}>
              <Flex border='1px' h='20px' w='20px' justifyContent={'center'}  
              bgColor='#ffffff' color='#d3814f'> <Text fontSize='x-small' marginTop={'2px'}
              > {'<'}</Text> </Flex>
            </a>
          </Button>
          </>)}

          {pageNumbers.length > 2 && (<>
          {page.map(number => (

            pageNumbers.length===number && pageNumbers.length > 2?
            [number-1,number].map((item)=>{
            <Button size={'xs'} bgColor='white'>
            <a onClick={() => paginate(item)}>
              <Flex border='1px' h='20px' w='20px' justifyContent={'center'}  
              bgColor={ item === currentPage ? '#d3814f': '#ffffff'} color= {currentPage === item ? '#ffffff': '#d3814f'}> <Text fontSize='x-small' marginTop={'2px'}
              > 
              {item}
              </Text> </Flex> 
            </a>
          </Button>
            })
            
         
       :

          <Button size={'xs'} bgColor='white' key={number} >
            <a onClick={() => paginate(number)}>
              <Flex border='1px' h='20px' w='20px' justifyContent={'center'}  
              bgColor={ number === currentPage ? '#d3814f': '#ffffff'} color= {currentPage === number ? '#ffffff': '#d3814f'}> <Text fontSize='x-small' marginTop={'2px'}
              > 
              {number}
              </Text> </Flex> 
            </a>
          </Button>
        ))}</>)}
        {pageNumbers.length > 2  &&(<> 
        <Button size={'xs'} bgColor='white' key={'dot'} >
            <a>
              <Flex border='1px' h='20px' w='20px' justifyContent={'center'}  
              bgColor='#ffffff' color= '#d3814f'> <Text fontSize='x-small' marginTop={'2px'}
              > 
              {'...'}
              </Text> </Flex> 
            </a>
          </Button>
          </>)}
          {pageNumbers.length <= 2 && (<>{pageNumbers.map(number => (
          
          <Button size={'xs'} bgColor='white' key={number} >
            <a onClick={() => paginate(number)}>
              <Flex border='1px' h='20px' w='20px' justifyContent={'center'}  
              bgColor={ number === currentPage ? '#d3814f': '#ffffff'} color= {currentPage === number ? '#ffffff': '#d3814f'}> <Text fontSize='x-small' marginTop={'2px'}
              > 
              {number}
              </Text> </Flex> 
            </a>
          </Button>
        ))}</>)}
         {pageNumbers.length > 2 && (<>
          <Button size={'xs'} bgColor='white' >
            <a onClick={() => paginate(pageNumbers.length)}>
              <Flex border='1px' h='20px' w='20px' justifyContent={'center'}  
              bgColor={ pageNumbers.length === currentPage ? '#d3814f': '#ffffff'} color= {currentPage === pageNumbers.length ? '#ffffff': '#d3814f'}> <Text fontSize='x-small' marginTop={'2px'}
              > 
              {/* {currentPage!==pageNumbers[pageNumbers.length-1] ? pageNumbers[pageNumbers.length-1]: '<'} */}
              {pageNumbers.length}
              </Text> </Flex> 
            </a>
          </Button>
         </>)}
          {pageNumbers.length > 2 &&(<><Button size={'xs'} bgColor='white' key={'next'} className='page-item'>
            <a onClick={() =>  navigate(1)}>
              <Flex border='1px' h='20px' w='20px' justifyContent={'center'}  
              bgColor='#ffffff' color='#d3814f'> <Text fontSize='x-small' marginTop={'2px'}
              > {'>'} </Text> </Flex>
            </a>
          </Button></>)}
     
    </Flex>
          
    </Flex>
  );
};

export default Pagination;