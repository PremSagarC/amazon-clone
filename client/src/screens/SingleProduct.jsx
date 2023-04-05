import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import {
    Box,
    Image,
    Text,
    Alert,
    AlertDescription,
    AlertIcon,
    Spinner,
    Wrap,
    Stack,
    Flex,
    Badge,
    Heading,
    HStack,
    Button, SimpleGrid, useToast, AlertTitle
} from '@chakra-ui/react'
import { MinusIcon, StarIcon, SmallAddIcon } from "@chakra-ui/icons";
import { BiPackage, BiCheckShield, BiSupport } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux'
import { getSingleProduct } from '../redux/actions/productAction'
import { addCartItem } from '../redux/actions/cartActions'

/* 
Go to Single Product page route is in ProductCard.jsx
the link is `/product/${product._id}`
*/

const SingleProduct = () => {

    const [amount, setAmount] = useState(1)
    let { id } = useParams()
    const toast = useToast()

    // Redux
    const dispatch = useDispatch();
    // State is the initial state from slices
    const products = useSelector((state) => state.products);
    const { loading, error, product, reviewSend } = products;

    const cartContent = useSelector((state) => state.cart);
    const { cart } = cartContent;

    useEffect(() => {
        dispatch(getSingleProduct(id))
    }, [dispatch, id, cart])

    const changeAmount = (input) => {
        if (input === 'plus') {
            setAmount(amount + 1)
        }
        if (input === 'minus') {
            setAmount(amount - 1)
        }
    }

    const addItem = () => {
        // The amount below is the quantity of the product
        dispatch(addCartItem(product._id, amount))
        toast({ description: 'Item Added', status: 'success', isClosable: true })
    }

    return (
        <Wrap spacing='30px' justify='center' minHeight='100vf'>
            {loading ? (
                <Stack direction='row' spacing={4}>
                    <Spinner mt={20} thickness='2px' speed='0.65s' emptyColor='gray.200' color='orange.500' size='xl' />
                </Stack>
            ) : error ? (
                <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>We are sorry!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            ) : (product &&
                <Box maxW={{ base: '3xl', lg: '5xl' }} mx='auto'
                    px={{ base: '4', md: '8', lg: '12' }} py={{ base: '4', md: '8', lg: '12' }}>
                    <Stack direction={{ base: 'column', lg: 'row' }}
                        align={{ base: 'center', lg: 'flex-start' }} spacing='4'>
                        <Stack pr={{ base: '0', md: '12' }} spacing={{ base: '8', md: '4' }}
                            flex='1.5' mb={{ base: '12', md: 'none' }}>
                            {product.productIsNew && (
                                <Badge rounded='full' w='40px' colorScheme='green' fontSize='0.8em' align='center'>
                                    New
                                </Badge>
                            )},
                            {product.stock <= 0 && (
                                <Badge rounded='full' w='80px' colorScheme='red' fontSize='0.8em' align='center'>
                                    Sold out
                                </Badge>
                            )}
                            <Heading fontSize='2xl' fontWeight='extrabold'>{product.name}</Heading>

                            <Stack spacing='5'>
                                <Box align={{ base: 'center', lg: 'center' }} w='50%'>
                                    <Image src={product.image} alt={product.name} rounded='lg' />
                                </Box>
                                <Box >
                                    <Text fontSize='xl'>${product.price}</Text>
                                    <Flex>
                                        <HStack spacing='2px'>
                                            <StarIcon color='orange.500' />
                                            <StarIcon color={product.rating >= 2 ? 'orange.500' : 'gray.200'} />
                                            <StarIcon color={product.rating >= 3 ? 'orange.500' : 'gray.200'} />
                                            <StarIcon color={product.rating >= 4 ? 'orange.500' : 'gray.200'} />
                                            <StarIcon color={product.rating >= 5 ? 'orange.500' : 'gray.200'} />
                                        </HStack>
                                        <Text>{product.numberOfReviews} Review
                                        </Text>
                                    </Flex>
                                </Box>
                                <Text>{product.description}</Text>
                                <Text fontWeight='bold'>Quantity</Text>
                                <Flex w='170px' p='5px' border='1px' borderColor='gray.200' alignItems='center'>
                                    <Button isDisabled={amount <= 1} onClick={() => changeAmount('minus')} >
                                        <MinusIcon />
                                    </Button>
                                    <Text mx='30px'>{amount}</Text>
                                    <Button isDisabled={amount >= product.stock} onClick={() => changeAmount('plus')}>
                                        <SmallAddIcon w='20px' h='25px' />
                                    </Button>
                                </Flex>

                                <Button colorScheme='orange'
                                    isDisabled={product.stock <= 0}
                                    onClick={() => addItem()}>
                                    Add to cart
                                </Button>
                                <Stack>
                                    <Flex align='center'>
                                        <BiPackage size='25px' />
                                        <Text fontWeight='medium' fontSize='md' ml='1'>
                                            Free Shipping if order above $1000
                                        </Text>
                                    </Flex>
                                    <Flex align='center'>
                                        <BiCheckShield size='20px' />
                                        <Text fw='medium' fontSize='small' ml='2'>
                                            2 year extended warranty
                                        </Text>
                                    </Flex>
                                    <Flex align='center'>
                                        <BiSupport size='20px' />
                                        <Text fw='medium' fontSize='small' ml='2'>
                                            We're here to help you
                                        </Text>
                                    </Flex>
                                </Stack>
                            </Stack>

                        </Stack>
                    </Stack>
                    <Stack>
                        <Text fontSize='xl' fontWeight='bold'>Reviews</Text>
                        <SimpleGrid minChildWidth='300px' spacingX='40px' spacingY='20px'>
                            {product.reviews.map((review) => (
                                <Box key={review._id}>
                                    <Flex spacing='2px' alignItems='center'>
                                        <HStack spacing='2px'>
                                            <StarIcon color='orange.500' />
                                            <StarIcon color={product.rating >= 2 ? 'orange.500' : 'gray.200'} />
                                            <StarIcon color={product.rating >= 3 ? 'orange.500' : 'gray.200'} />
                                            <StarIcon color={product.rating >= 4 ? 'orange.500' : 'gray.200'} />
                                            <StarIcon color={product.rating >= 5 ? 'orange.500' : 'gray.200'} />
                                        </HStack>
                                        <Text ml='1'>
                                            - {review.title && review.title}
                                        </Text>
                                    </Flex>
                                    <Box py='12px'>{review.comment}</Box>
                                    <Text fontSize='sm' color='gray.400'>
                                        by {review.name}, {new Date(review.createdAt).toDateString()}
                                    </Text>
                                </Box>
                            ))}
                        </SimpleGrid>
                    </Stack>
                </Box>
            )
            }
        </Wrap >
    )
}

export default SingleProduct