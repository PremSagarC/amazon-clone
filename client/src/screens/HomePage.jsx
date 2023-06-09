import {
    Box,
    Flex,
    Heading,
    HStack,
    Icon,
    Image,
    Link,
    Skeleton,
    Stack,
    useColorModeValue,
    useColorMode
} from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';
import { Link as ReactLink } from 'react-router-dom';


const HomePage = () => {
    const { colorMode } = useColorMode();
    return (
        <Box maxW='8xl' mx='auto' px={{ base: '0', lg: '12' }} py={{ base: '0', lg: '12' }} minH='6xl'>
            <Stack direction={{ base: 'column-reverse', lg: 'row' }} spacing={{ base: '0', lg: '20' }}>
                <Box
                    width={{ lg: 'sm' }}
                    transform={{ base: 'translateY(-50%)', lg: 'none' }}
                    bg={{ base: useColorModeValue('orange.50', 'gray.700'), lg: 'transparent' }}
                    mx={{ base: '6', md: '8', lg: '0' }}
                    px={{ base: '6', md: '8', lg: '0' }}
                    py={{ base: '6', md: '8', lg: '12' }}>
                    <Stack spacing={{ base: '8', lg: '10' }}>
                        <Stack spacing={{ base: '2', lg: '4' }}>
                            <Flex alignItems='center'>
                                <Link as={ReactLink} to='/'>
                                    <Flex alignItems='center' justify='center'>
                                        <img width={90} justify='center'
                                            src={colorMode === 'light' ?
                                                'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1280px-Amazon_logo.svg.png' :
                                                'https://www.freepnglogos.com/uploads/amazon-png-logo-vector/large-images-amazon-png-logo-vector-7.png3ft3d1416935166817'} alt="amazon" />
                                    </Flex>
                                </Link>
                            </Flex>
                            <Heading size='xl' fontWeight='normal'>
                                Refresh your equipment
                            </Heading>
                        </Stack>
                        <HStack spacing='3'>
                            <Link
                                as={ReactLink}
                                to='/products'
                                color={useColorModeValue('orange.500', 'orange.300')}
                                fontWeight='bold'
                                fontSize='lg'>
                                Buy now
                            </Link>
                            <Icon color={useColorModeValue('orange.500', 'ornage.300')} as={FaArrowRight} />
                        </HStack>
                    </Stack>
                </Box>
                <Flex flex='1' overflow='hidden'>
                    <Image
                        src='images/landing.jpg'
                        alt='Lovely Image'
                        fallback={<Skeleton />}
                        maxH='550px'
                        minW='300px'
                        objectFit='cover'
                        flex='1'
                    />
                </Flex>
            </Stack>
        </Box>
    )
}

export default HomePage