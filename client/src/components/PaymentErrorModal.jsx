import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Alert,
    AlertDescription,
    AlertTitle,
    AlertIcon,
    Wrap,
    Button
} from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom'
const PaymentErrorModal = ({ isOpen, onClose }) => {
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <Wrap justify='center' direction='column' align='center' mt='20px'>
                            <Alert
                                h='200px'
                                status='error'
                                variant='subtle'
                                flexDirection='column'
                                alignItems='center'
                                justifyContent='center'
                                textAlign='center'>
                                <AlertIcon boxSize='55px' />
                                <AlertTitle pt='8px' fontSize='xl'>
                                    Payment Failed!
                                </AlertTitle>
                                <AlertDescription>We couldn't process your payment.</AlertDescription>
                                <Button colorScheme='teal' variant='outline' as={ReactLink} to='/your-orders'>
                                    Your Order
                                </Button>
                                <Button colorScheme='teal' variant='outline' as={ReactLink} to='/products'>
                                    Products
                                </Button>
                            </Alert>
                        </Wrap>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default PaymentErrorModal;