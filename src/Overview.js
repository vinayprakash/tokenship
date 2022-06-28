import React from 'react';
import Doughchart from './Doughchart';
import Chart from './Chart';
import App from './App';
import Tokenbal from './Tokenbal';
import {
    Box,Flex,Text,Button}
    from '@chakra-ui/react'
export default function Overview(){
return (
<App>
<Flex width='100%' height='100%'>
    <Flex height='100%' width='68%' marginLeft={'1%'} marginTop='2%' display={'column'}> 
    <Doughchart />
    <Chart />
    </Flex>
    
    <Flex width='30%' marginTop='2%'>
        <Flex width={'100%'} height='100%'>
        <Tokenbal />
        </Flex>
    </Flex>
</Flex>

</App>
);
}