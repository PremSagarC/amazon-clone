import React from 'react'
import {
    Box,
    Wrap,
    Flex,
    Heading,
    HStack,
    Link,
    useColorModeValue as mode,
    Alert,
    Spinner,
    AlertIcon,
    Stack,
    AlertTitle
} from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom'
import CartItem from '../components/CartItem'

// Importing Redux Components
import CartOrderSummary from '../components/CartOrderSummary'
import { useSelector } from 'react-redux'



const CartScreen = () => {

    const cartInfo = useSelector(state => state.cart)
    const { loading, error, cart } = cartInfo

    const getHeadingContent = () => (cart.length === 1 ? '(1 Item)' : `(${cart.length} Items)`);

    return (
        <Wrap spacing='30px' justify='center' minHeight='100vh'>
            {loading ? (
                <Stack direction='row'>
                    <Spinner size='xl' mt={20} color='orange.500' emptyColor='gray.200' />
                </Stack>
            ) : error ? (
                <Alert>
                    <AlertIcon />
                    Opps!! Problem occured while loading..
                </Alert>
            ) : cart.length <= 0 ? (
                <Alert status='warning'>
                    <AlertIcon />
                    <AlertTitle>🛒Cart is Empty.</AlertTitle>
                    <Link as={ReactLink} to='/products'>
                        Click to purchase our products.
                    </Link>
                </Alert>
            ) : (
                <Box maxW={{ base: '3xl', lg: '7xl' }} mx='4'
                    px={{ base: '4', md: '8', lg: '12' }} py={{ base: '4', md: '8', lg: '12' }}>
                    <Stack direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }} spacing={{ base: '8', md: '16' }}>
                        <Stack spacing={{ base: '8', md: '10' }} flex='2'>
                            <Heading fontSize='2xl' fontWeight='extrabold'>
                                Shopping Cart {getHeadingContent()}
                            </Heading>
                            <Stack spacing='6'>
                                {cart.map((cartItem) => (
                                    <CartItem key={cartItem.id} cartItem={cartItem} />
                                ))}
                            </Stack>
                        </Stack>
                        <Flex direction='column' align='center' flex='1'>
                            <CartOrderSummary />
                            <HStack mt='6'>
                                <p>or</p>
                                <Link as={ReactLink} to='/products' color={mode('orange:500', 'orange.200')}>
                                    Continue Shopping
                                </Link>
                            </HStack>
                        </Flex>
                    </Stack>
                </Box>
            )}
        </Wrap>
    )
}

export default CartScreen