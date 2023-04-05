import React, { useEffect } from 'react'

import {
    Box,
    Container,
    FormControl,
    Heading,
    useToast,
    HStack,
    Stack,
    Text,
    useBreakpointValue,
    Alert,
    AlertIcon,
    AlertTitle,
    Button,
    AlertDescription
} from '@chakra-ui/react'
import { Formik } from 'formik'
import * as Yup from 'yup'
/* Yup fills the requirements of the form 
For example:- It gives how to write a email 
              It gives how to write a password [0-9^A-Za-z^!@#$%^&*()]
*/
import { useSelector, useDispatch } from 'react-redux'
import { Link as ReactLink, useLocation, useNavigate } from 'react-router-dom'
import TextField from '../components/TextField'
import PasswordTextField from '../components/PasswordTextField'
import { login } from '../redux/actions/userActions'


const LoginScreen = () => {

    const navigate = useNavigate();
    const location = useLocation()
    const dispatch = useDispatch();
    const redirect = '/products'
    const toast = useToast();

    const user = useSelector((state) => state.user)
    const { loading, error, userInfo } = user

    const headingBreakpoints = useBreakpointValue({ base: 'lg', md: 'xl' })
    const boxBreakPoints = useBreakpointValue({ base: 'transparent', md: 'bg-surface' });

    useEffect(() => {
        if (userInfo) {
            if (location.state?.from) {
                navigate(location.state.from);
            } else {
                navigate(redirect);
            }
            toast({ description: 'Login successful.', status: 'success', isClosable: true });
        }
    }, [userInfo, redirect, error, navigate, location.state, toast]);

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={Yup.object({
                email: Yup.string().email('Invalid email').required('An email address is required.'),
                password: Yup.string().min(6, 'Password must be at least 6 characters long').required('A password is required.')
            })}
            onSubmit={(values) => {
                dispatch(login(values.email, values.password))
            }}
        >
            {(formik) => (
                <Container maxW='lg' py={{ base: '12', md: '24' }} px={{ base: '0', md: '8' }} minH='4xl'>
                    <Stack spacing='6'>
                        <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
                            <Heading size={headingBreakpoints}>Log in to your account</Heading>
                        </Stack>
                    </Stack>
                    <Box
                        py={{ base: '0', md: '8' }}
                        px={{ base: '4', md: '10' }}
                        bg={{ boxBreakPoints }}
                        boxShadow={{ base: 'none', md: 'xl' }}>
                        <Stack spacing='6' as='form' onSubmit={formik.handleSubmit}>
                            {error && (
                                <Alert
                                    status='error'
                                    flexDirection='column'
                                    alignItems='center'
                                    justifyContent='center'
                                    textAlign='center'>
                                    <AlertIcon />
                                    <AlertTitle>We are sorry!</AlertTitle>
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}
                            <Stack spacing='5'>
                                <FormControl>
                                    <TextField type='text' name='email' placeholder='you@example.com' label='Email' />
                                    <PasswordTextField type='password' name='password' placeholder='your password' label='Password' />
                                </FormControl>
                            </Stack>
                            <Stack spacing='6'>
                                <Button colorScheme='orange' size='lg' fontSize='md'
                                    isLoading={loading} type='submit' redirect>
                                    Sign in
                                </Button>
                            </Stack>
                        </Stack>
                        <HStack spacing='1' mt='5' justify='center'>
                            <Text color='muted'>Don't have an account ?</Text>
                            <Button as={ReactLink} to='/register' variant='link' colorScheme='orange'>
                                Sign up
                            </Button>
                        </HStack>
                    </Box>
                </Container>
            )}
        </Formik>
    )
}

export default LoginScreen