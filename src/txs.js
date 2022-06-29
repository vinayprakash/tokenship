import React from 'react';
import {
  Flex,
  Label
} from '@chakra-ui/react'
export default function TxList({ txs }) {
    if (txs.length === 0) return null;
  
    return (
      <>
        {txs.map((item) => (
          <Flex key={item} className="alert alert-info mt-5">
            <Flex className="flex-1">
              <label>{item.hash}</label>
            </Flex>
          </Flex>
        ))}
      </>
    );
  }