import './App.css';
import { Flex, Box,Heading,Input,Button,InputGroup,Icon,Menu,MenuButton,MenuList,
  MenuItem, Grid, GridItem,Text,
  HStack,Stack, VStack, Container} from '@chakra-ui/react'
import { SearchIcon,ChevronDownIcon,QuestionIcon,TriangleDownIcon } from '@chakra-ui/icons'


function Headers() {
  var headerMap={
    overview:'Overview',
    asset: 'My Assets',
    activity : 'Activity'
  }
  var path = window.location.pathname;
  var page = path.split("/").pop();
  const header = headerMap[page] || 'Overview';
    return(
      <div className="App" flexBasis={"fit-content"} style={{'width':'100%'}}>
<Box  width={"100%"} bgColor="gray.100">
  <Flex alignItems="center" alignContent={"start"} padding="14px" 
        flexbasis="fit-content" 
        justifyContent="space-between">
        <Box>
          <Heading as='h3' size='lg'> {header} </Heading>
        </Box>
            <Flex>
              <Flex marginLeft={"400px"} border={"1px"} borderRadius={"5px"} h="27px" borderColor={'gray.200'}
              bgColor='white'>
                <Input w="250px"
                  size='xs'
                  placeholder='Search for token,pools or vaults' 
                  borderColor={"white"}
                />
                <Icon  as={SearchIcon} w="20px" h="12px" alignSelf={"center"}/>
              </Flex>
              <Menu >
                <MenuButton 
                marginLeft={"10px"} 
                w="100px" h="30px" as={Button} 
                bgColor="white" 
                border={"1px"} 
                borderColor={"gray.200"}
    
                rightIcon={<TriangleDownIcon boxSize={'10px'}/>}>
                <Box boxSize={'8px'} marginLeft='-7px' marginBottom={'-9px'}>
                <img src="https://www.kindpng.com/picc/m/130-1303882_dollar-icon-png-dollar-icon-no-background-transparent.png" alt="Dollar" />
                </Box>
                
              <Text fontSize='12px'> USD </Text>
                </MenuButton>
              <MenuList >
                <MenuItem>RS</MenuItem>
                <MenuItem>AED</MenuItem>
              </MenuList>
              </Menu>
              <Icon marginLeft={"20px"} w="20px" h="20px" alignSelf={"center"}>
                <QuestionIcon />
              </Icon>
              </Flex>
       
        </Flex>
    
</Box>
        </div>
    )
}
    export default Headers;