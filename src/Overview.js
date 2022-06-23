import React from 'react';
import Doughchart from './Doughchart';
import Chart from './Chart';
import App from './App';
import {
    Box,Flex,Text,Button}
    from '@chakra-ui/react'
export default function Overview(){
return (
<App>
<Flex marginLeft={'2%'} marginTop='2%' display={'column'}> 
    <Doughchart />
    <Chart />
</Flex>
</App>
);
}