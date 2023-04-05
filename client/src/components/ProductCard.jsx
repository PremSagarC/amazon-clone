import React from 'react'
import {
  Flex, Circle, Box, Image, Badge, useColorModeValue,
  Icon, Tooltip, Stack, Link, Button, useToast, HStack, Text
} from '@chakra-ui/react'

import { BsCart3 } from 'react-icons/bs'
import { Link as ReactLink } from 'react-router-dom'
// import { StarIcon } from '@chakra-ui/icons'

// React Redux
import { useDispatch, useSelector } from 'react-redux'
import { addCartItem } from '../redux/actions/cartActions'
import { StarIcon } from '@chakra-ui/icons'

const ProductCard = ({ product }) => {

  const dispatch = useDispatch()
  const toast = useToast()

  const cartInfo = useSelector(state => state.cart)
  const { cart } = cartInfo

  const additem = (id) => {
    if (cart.some((cartItem) => cartItem.id === id)) {
      toast({
        description: 'This item is already in your cart',
        status: 'error',
        isClosable: true,
      })
    } else {
      dispatch(addCartItem(id, 1))
      toast({
        description: 'Item added to your cart',
        status: 'success',
        isClosable: true
      })
    }
  }

  return (
    <Stack p='2' spacing='1px' bg={useColorModeValue('white', 'gray.800')}
      borderWidth='1px' rounded='lg' shadow='lg' position='relative' minW='240px' h='380px'
      cursor='pointer' _hover={{ transform: 'scale(1.05)' }} transition='all 0.4s ease-in-out'
    >
      {/* If in Stock */}
      {product.isNew && <Circle size='10px' position='absolute' top={2} right={2} bg='green.500' />}

      {/* If not in Stock */}
      {product.stock <= 0 && <Circle size='10px' position='absolute' top={2} right={2} bg='red.300' />}
      
      {/* The product._id is from the data passed from
          productScreen */}
      <Link as={ReactLink} to={`/product/${product._id}`}>
        <Image src={product.image} alt={product.name} roundedTop='lg' />
      </Link>

      <Box flex='1' maxH='5' alignItems='baseline'>
        {product.stock <= 0 &&
          <Badge rounded='full' px='10px' colorScheme='red'>Sold Out</Badge>}
        {product.stock > 0 &&
          <Badge rounded='full' px='10px' colorScheme='green'>In Stock</Badge>}
      </Box>

      <Flex mt='1' justify='space-between' alignContent='center'>
        <Link as={ReactLink} to={`/product/${product._id}`} pt='2'>
          <Box fontSize='l' fontWeight='semibold' lineHeight='tight'>
            {product.name}
          </Box>
        </Link>
      </Flex>

      <Flex justify='space-between'>
        <Box fontSize='2xl' color={useColorModeValue('gray.800', 'white')} lineHeight='tight' >
          <Box as='span' color={`gray.600`} fontSize='2xl'>$</Box>
          <Box as='span' color={`gray.600`} fontSize='2xl'>{product.price.toFixed(2)}</Box>
        </Box>
        <Tooltip label='Add to cart' bg='white' placement='top' color='gray.800' fontSize='1.2rem'>
          <Button variant='ghost' display='flex' disabled={product.stock <= 0} rounded='full'
            onClick={() => additem(product._id)}
          >
            <Icon as={BsCart3} h='6' width='6' />Add To Cart
          </Button>
        </Tooltip>
      </Flex>
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
    </Stack >
  )
}

export default ProductCard