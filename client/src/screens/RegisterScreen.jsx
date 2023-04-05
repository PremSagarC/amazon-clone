import React, { useEffect } from 'react'
import {
    Box,
    Button,
    FormControl,
    Heading,
    HStack,
    useBreakpointValue,
    Stack,
    Text,
    Alert,
    AlertIcon,
    AlertTitle,
    useToast,
    AlertDescription,
    Container,
} from '@chakra-ui/react'

import TextField from '../components/TextField'
import PasswordTextField from '../components/PasswordTextField'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { Link as ReactLink, useLocation, useNavigate } from 'react-router-dom'
import { register } from '../redux/actions/userActions'

const RegisterScreen = () => {

    const navigate = useNavigate();
    const location = useLocation()
    const redirect = '/login'
    const dispatch = useDispatch()
    const toast = useToast();

    const user = useSelector((state) => state.user)
    const { loading, error, userInfo } = user

    const headingBreakpoints = useBreakpointValue({ base: 'lg', md: 'xl' })
    const boxBreakPoints = useBreakpointValue({ base: 'transparent', md: 'bg-surface' });

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
            toast({ description: 'Registered successful.', status: 'success', isClosable: true });
        }
    }, [userInfo, redirect, error, navigate, location.state, toast]);
// The above array is to observe these specific elements
    return (
        <Formik
            initialValues={{ email: '', password: '', name: '' }}
            validationSchema={Yup.object({
                name: Yup.string().required('An name is required.'),
                email: Yup.string().email('Invalid email').required('An email address is required.'),
                password: Yup.string().min(6, 'Password must be at least 6 characters long').required('A password is required.'),
                confirmPassword: Yup.string().min(6, 'Password must be at least 6 characters long').oneOf([Yup.ref('password'), null], 'Passwords must match')
            })}
            onSubmit={(values) => {
                dispatch(register(values.name, values.email, values.password))
            }}
        >
            {(formik) => (
                <Container maxW='lg' py={{ base: '12', md: '24' }} px={{ base: '0', md: '8' }} minH='4xl'>
                    <Stack spacing='6'>
                        <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
                            <Heading size={headingBreakpoints}>Create An Account.</Heading>

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
                                    <TextField type='text' name='name' placeholder='Your First And Last Name' label='Full name' />
                                    <TextField type='text' name='email' placeholder='you@example.com' label='Email' />
                                    <PasswordTextField type='password' name='password' placeholder='your password' label='Password' />
                                    <PasswordTextField type='password' name='confirmPassword' placeholder='Confirm your password' label='Confirm your password' />
                                </FormControl>
                            </Stack>
                            <Stack spacing='6'>
                                <Button colorScheme='orange' size='lg' fontSize='md'
                                    isLoading={loading} type='submit' redirect >
                                    Sign up
                                </Button>
                            </Stack>
                        </Stack>
                        <HStack spacing='1' mt='5' justify='center'>
                            <Text color='muted'>Already a user ?</Text>
                            <Button as={ReactLink} to='/login' variant='link' colorScheme='orange'>
                                Sign in
                            </Button>
                        </HStack>
                    </Box>
                </Container>
            )}
        </Formik>
    )
}

export default RegisterScreen