import React, { ReactNode } from 'react';
import WalletApp from './WalletApp'
import {
  IconButton,
  Image,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,Grid,GridItem,Menu,MenuButton,MenuItem,MenuList,Button,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,FiBriefcase
} from 'react-icons/fi';
import { IconType} from 'react-icons';
import { SearchIcon,ChevronDownIcon } from '@chakra-ui/icons'
import { ReactText } from 'react';

interface LinkItemProps {
  name: string;
  icon: IconType;
}
const LinkItems = [
  { name: 'Overview', icon: FiHome },
  { name: 'My Assets', icon: FiBriefcase},
  { name: 'Exchange', icon: FiBriefcase},
  { name: 'Earn', icon: FiTrendingUp },
  { name: 'NFT', icon: FiCompass },
  { name: 'Activity', icon: FiStar },
  { name: 'Settings', icon: FiSettings },
];

export default function SimpleSidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')} width={'15%'}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="2px"
      borderRightColor='#836cff'
  
      //{useColorModeValue('gray.200', 'gray.700')}
      //w={{ base: 'full', md: 60 }}
      w='15%'
      pos="fixed"
      h="full"
      {...rest}
      >
    <Image 
  boxSize='100px'
  w="189px"
  h="59px"
  objectFit='cover'
  margin={"10px 20px"}
  src='https://www.kindpng.com/picc/m/298-2985702_nissan-frontier-logo-vector-hd-png-download.png' alt='Dan Abramov' />
      <WalletApp />
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} fontSize="12px">
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="3"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: '#f9f1eb',
          color: '#cc703c',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: '#cc703c',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}>
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  );
};