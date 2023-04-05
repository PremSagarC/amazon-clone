import {
    Button,
    ButtonGroup,
    Container,
    Divider,
    IconButton,
    Input,
    Stack,
    Text,
    useColorModeValue,
    Box,
    Flex,
    useColorMode,
} from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link, Link as ReactLink } from 'react-router-dom';

const Footer = () => {
    const { colorMode } = useColorMode()
    return (
        <Box w='100%' bg={useColorModeValue('gray.100', 'gray.900')}>
            <Container as='footer' role='contentinfo' maxW='7xl'>
                <Stack
                    spacing='8'
                    direction={{ base: 'column', md: 'row' }}
                    justify='space-between'
                    py={{ base: '12', md: '16' }}>
                    <Stack spacing={{ base: '6', md: '8' }} align='start'>
                        <Link as={ReactLink} to='/'>
                            <Flex alignItems='center' justify='center'>
                                <img width={90} justify='center'
                                    src={colorMode === 'light' ?
                                        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1280px-Amazon_logo.svg.png' :
                                        'https://www.freepnglogos.com/uploads/amazon-png-logo-vector/large-images-amazon-png-logo-vector-7.png3ft3d1416935166817'} alt="amazon" />
                            </Flex>
                        </Link>
                        <Text color='muted'>We love technology.</Text>
                    </Stack>
                    <Stack direction={{ base: 'column-reverse', md: 'column', lg: 'row' }} spacing={{ base: '12', md: '8' }}>
                        <Stack direction='row' spacing='8'>
                            <Stack spacing='4' minW='36' flex='1'>
                                <Text fontSize='sm' fontWeight='semibold' color='subtle'>
                                    Product
                                </Text>
                                <Stack spacing='3' shouldWrapChildren>
                                    <Button variant='link'>How it works</Button>
                                    <Button variant='link'>Pricing</Button>
                                </Stack>
                            </Stack>
                            <Stack spacing='4' minW='36' flex='1'>
                                <Text fontSize='sm' fontWeight='semibold' color='subtle'>
                                    Legal
                                </Text>
                                <Stack spacing='3' shouldWrapChildren>
                                    <Button variant='link'>Privacy</Button>
                                    <Button variant='link'>Terms</Button>
                                    <Button variant='link'>License</Button>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack spacing='4'>
                            <Text fontSize='sm' fontWeight='semibold' color='subtle'>
                                Stay up to date
                            </Text>
                            <Stack spacing='4' direction={{ base: 'column', sm: 'row' }} maxW={{ lg: '360px' }}>
                                <Input placeholder='Enter your email' type='email' required />
                                <Button variant='primary' type='submit' flexShrink={0}>
                                    <Link as={ReactLink} to='/login'>Login</Link>
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
                <Divider />
                <Stack pt='8' pb='12' justify='space-between' direction={{ base: 'column-reverse', md: 'row' }} align='center'>
                    <Text fontSize='sm' color='subtle'>
                        &copy; {new Date().getFullYear()} Amazon, Inc. All rights reserved.
                    </Text>
                    <ButtonGroup variant='ghost'>
                        <IconButton as='a' href='#' aria-label='LinkedIn' icon={<FaLinkedin fontSize='1.25rem' />} />
                        <IconButton as='a' href='#' aria-label='GitHub' icon={<FaGithub fontSize='1.25rem' />} />
                        <IconButton as='a' href='#' aria-label='Twitter' icon={<FaTwitter fontSize='1.25rem' />} />
                    </ButtonGroup>
                </Stack>
            </Container>
        </Box>
    )
};

export default Footer;