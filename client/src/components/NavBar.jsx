import React from 'react'
import { Box, Flex, Icon, HStack, Link, IconButton, useDisclosure, Button, Stack, useColorModeValue, useColorMode, useToast, Menu, MenuButton, MenuList, Text, MenuDivider, MenuItem } from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom'
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { CgProfile } from 'react-icons/cg'
import { FiShoppingCart } from 'react-icons/fi'
import { MdLocalShipping } from 'react-icons/md'
import { MdLogout } from 'react-icons/md'

import { BsCart3 } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'

import { logout } from '../redux/actions/userActions'

const ShoppingCartIcon = () => {
    const cartInfo = useSelector((state) => state.cart);
    const { cart } = cartInfo;
    return (
        <Flex>
            Cart
            <Icon ml='-1.5' as={FiShoppingCart} h='4' w='7' alignSelf='center' />
            {cart.length === 0 ? (
                <Stack display='none' bgColor='green.500'>
                    <Text>none</Text>
                </Stack>
            )
                : (
                    <Stack w='15px' h='15px' top='-8px' left='-8px' as='sub' fontSize='xs' bgColor='orange.500' rounded='full'>
                        <Text fontStyle='italic' left='4px' top='6.5px' w='15px' h='15px' as='sub' fontSize='xs'>
                            {cart.length}
                        </Text>
                    </Stack>
                )}
        </Flex >
    );
};

const NavBar = () => {

    const { isOpen, onClose, onOpen } = useDisclosure()
    const { colorMode, toggleColorMode } = useColorMode()

    const user = useSelector((state) => state.user)
    const { userInfo } = user
    const dispatch = useDispatch()
    const toast = useToast()

    const logoutHandler = () => {
        dispatch(logout())
        toast({ description: 'User have been logged out', status: 'success', isClosable: true })
    }

    return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            <Flex h={16} alignItems='center' justifyContent='space-between'>
                <IconButton size='md' icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    display={{ md: 'none' }}
                    onClick={isOpen ? onClose : onOpen}
                /* If the Menu is open, then after clicking
                the Hamburger Icon, the Menu will close.
                And If Not, then the Menu will open.  
                */
                />
                <HStack> {/* Horizontal Stack */}
                    <Link as={ReactLink} to='/'>
                        <Flex alignItems='center' justify='center'>
                            <img width={90} justify='center'
                                src={colorMode === 'light' ?
                                    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1280px-Amazon_logo.svg.png' :
                                    'https://www.freepnglogos.com/uploads/amazon-png-logo-vector/large-images-amazon-png-logo-vector-7.png3ft3d1416935166817'} alt="amazon" />
                        </Flex>
                    </Link>

                    <HStack fontWeight='bold' as='nav' display={{ base: 'none', md: 'flex' }}>
                        <Button as={ReactLink} to='/products' bg="transparent"
                            _hover={{ color: 'orange.400' }}
                        >Products</Button>
                        <Button as={ReactLink} to='/cart' bg="transparent"
                            display='flex' alignItems='center'
                            _hover={{ color: 'orange.400' }}>
                            <ShoppingCartIcon />
                        </Button>
                    </HStack>
                </HStack>
                <Flex alignItems='center'>
                    <Button width='45px' bg="transparent" cursor='pointer'
                        as={colorMode === 'light' ? MoonIcon : SunIcon} alignSelf='center'
                        onClick={() => toggleColorMode()}
                    ></Button>
                    {userInfo ? (
                        <>
                            <Menu>
                                <MenuButton ml='1' px='4' py='2' transition='all 0.3s' as={Button}>
                                    {userInfo.name} <ChevronDownIcon />
                                </MenuButton>
                                <MenuList>
                                    <MenuItem as={ReactLink} to='/profile'>
                                        <CgProfile />
                                        <Text ml='2'>Profile</Text>
                                    </MenuItem>
                                    <MenuItem as={ReactLink} to='/your-orders'>
                                        <MdLocalShipping />
                                        <Text ml='2'>Your Orders</Text>
                                    </MenuItem>
                                    <MenuDivider />
                                    <MenuItem
                                        onClick={logoutHandler}
                                    >
                                        <MdLogout />
                                        <Text ml='2'>Logout</Text>
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </>)
                        : (
                            // without fragments this will show a parent error
                            <>
                                <Button as={ReactLink} to='/login' ml='3px'>
                                    Sign In
                                </Button>
                                <Button as={ReactLink} to='/register'
                                    display={{ base: 'none', md: 'flex' }}
                                    marginLeft={5} bg='orange.400' _hover={{ bg: 'orange.400' }}>
                                    Sign Up
                                </Button>
                            </>
                        )}

                </Flex>
            </Flex>

            {/* Inside Hamburger */}
            {isOpen ? (
                <Box pb={4} display={{ md: 'none' }}>
                    <Stack as='nav' spacing='4'>
                        <Button as={ReactLink} to='/products' variant='Link'
                            _hover={{ color: 'orange.400' }}
                        >Products</Button>
                        <Button as={ReactLink} to='/cart' variant='Link'
                            display='flex' alignItems='center'
                            _hover={{ color: 'orange.400' }}>
                            <BsCart3 />
                            Cart
                        </Button>
                        {userInfo ? (
                            <>
                                <Button onClick={logoutHandler}>
                                    <MdLogout />
                                    <Text ml='2'>Logout</Text>
                                </Button>
                            </>
                        )
                            : (
                                <>
                                    <Button as={ReactLink} to='/register' key='sign_up'
                                        marginLeft={5} bg='orange.400' _hover={{ bg: 'orange.400' }}>
                                        Sign Up
                                    </Button>
                                </>
                            )}

                    </Stack>
                </Box >
            ) : null
            }
        </Box >
    )
}

export default NavBar