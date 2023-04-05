import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { Spinner, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

import PAYPAL_CLIENT_ID from '../client_id'

const PayPalButton = ({ total, onPaymentSuccess, onPaymentError }) => {

    const [paypalClient, setPayPalClient] = useState(null)

    useEffect(() => {
        const paypalkey = async () => {
            const { data: clientId } = await axios.get('http://localhost:5000/api/config/paypal')
            setPayPalClient(clientId)
        }
    })

    return (
        <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID }}>
            <PayPalButtons
                forceReRender={[total()]}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: total(),
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        onPaymentSuccess(data)
                    });
                }}
                onError={(err) => {
                    onPaymentError(err)
                }}
            />
        </PayPalScriptProvider>
    );
}

export default PayPalButton