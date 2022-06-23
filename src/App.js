// import logo from './logo.svg';
import './App.css';
import {
  Flex, Box, Heading, Input, Button, InputGroup, Icon, Menu, MenuButton, MenuList,
  MenuItem, Grid, GridItem,
  HStack, Stack, VStack, Container
} from '@chakra-ui/react'
import { SearchIcon, ChevronDownIcon } from '@chakra-ui/icons'
import Headers from './Header';
import SidebarWithHeader from './sidebarnew.tsx';
import Chart from './Chart';
import DoughnutChart from './Doughchart';
import Tokenbal from './Tokenbal';
import TableData from './Asset';
import ActivityData from './Activity';
import {
  Link
} from "react-router-dom";


function App({children}) {
  return (
    <Flex className="App" flexbasis={"fit-content"}>
      <SidebarWithHeader />
      <Flex direction={'column'} width='85%'>

        <Headers />
        {children}

      </Flex>


    </Flex>
  

  )
}
export default App;
