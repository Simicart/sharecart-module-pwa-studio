import { gql } from '@apollo/client';
import { CartPageFragment } from '@magento/venia-ui/lib/components/CartPage/cartPageFragments.gql';

export const GET_CART_DETAILS = gql`
    query GetCartDetails($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            mp_share_cart_token
            ...CartPageFragment
        }
    }
    ${CartPageFragment}
`;
