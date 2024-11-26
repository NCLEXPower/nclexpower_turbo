import React from 'react'
import OrderCheckout from '@/components/blocks/OrderCheckoutBlock/OrderCheckoutBlock'
import CSPHead from 'core-library/components/CSPHead';
import { GetServerSideProps } from 'next';
import { withCSP } from 'core-library';

interface Props {
    generatedNonce: string;
}

const OrderCheckoutPage:React.FC<Props> = ({generatedNonce}) => {
    return (
    <>
    <CSPHead nonce={generatedNonce} />
    <OrderCheckout />
    </>
)}

export const getServerSideProps: GetServerSideProps = withCSP();

export default OrderCheckoutPage
