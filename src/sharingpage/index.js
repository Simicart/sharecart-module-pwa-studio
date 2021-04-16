import React from 'react';
import { useLocation } from 'react-router-dom';
import { gql } from '@apollo/client';
import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';
import { useMutation } from '@apollo/client';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { Redirect } from '@magento/venia-drivers';

const MERGE_CART = gql`
    mutation MpShareCart($mp_share_cart_token: String!, $destination_cart_id: String!) {
        MpShareCart(mp_share_cart_token: $mp_share_cart_token, destination_cart_id: $destination_cart_id) {
            id
        }
    }
`

const ShareCart = props => {
    console.log(props)
    const location = useLocation();
    const [{ cartId }] = useCartContext();

    const [applyToken, { data, loading, error }] = useMutation(MERGE_CART);

    if (cartId && location && location.pathname && !loading && !data && !error) {
        const cartToken = location.pathname.replace('/sharecart/', '');
        applyToken({
            variables: {
                mp_share_cart_token: cartToken,
                destination_cart_id: cartId
            }
        });
    }
    if (data && data.MpShareCart && data.MpShareCart.id) {
        return <Redirect to="/cart" />;
    }

    return fullPageLoadingIndicator;
}

export default ShareCart;