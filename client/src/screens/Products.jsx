import React, { useEffect } from 'react'
import { Alert, AlertIcon, Center, Spinner, Stack, Wrap, WrapItem } from '@chakra-ui/react'

import ProductCard from '../components/ProductCard'

// Importing redux components
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../redux/actions/productAction'


const Products = () => {

  /*  dispatch is a function provided by the 
    Redux store that is used to send an action to the store*/
  const dispatch = useDispatch()

  /* The Below state is initalState Slices where state.products = payload
      And we get this from productActions 
      axios.get('http://localhost:5000/api/products*') */
  const ProductList = useSelector((state) => state.products);
  const { loading, error, products } = ProductList;

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  return (
    <Wrap spacing='2rem' justify='center' minHeight='100vh'>
      {/* Loading Component */}
      {
        loading ? (
          <Stack>
            <Spinner size='xl' mt={20} thickness='2px' speed='650ms' color='orange.500' emptyColor='gray.200' />
          </Stack>
        ) : error ? (
          <Alert status='error'>
            <AlertIcon />
            Opps!! Try refreshing the page
          </Alert>
        ) : (
          products.map((product) => (
            <WrapItem key={product._id}>
              <Center w='250px' h='450px'>
                <ProductCard product={product} />
              </Center>
            </WrapItem>
          )))
      }
    </Wrap >
  )
}

export default Products 