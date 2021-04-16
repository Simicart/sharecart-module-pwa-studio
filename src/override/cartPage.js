import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useCartPage } from './useCartPage';

import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { Title } from '@magento/venia-ui/lib/components/Head';
import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';
import StockStatusMessage from '@magento/venia-ui/lib/components/StockStatusMessage';
import PriceAdjustments from '@magento/venia-ui/lib/components/CartPage/PriceAdjustments';
import ProductListing from '@magento/venia-ui/lib/components/CartPage/ProductListing';
import PriceSummary from '@magento/venia-ui/lib/components/CartPage/PriceSummary';
import defaultClasses from '@magento/venia-ui/lib/components/CartPage/cartPage.css';
import { useToasts } from '@magento/peregrine';
import { GET_CART_DETAILS } from './cartPage.gql';

/**
 * Structural page component for the shopping cart.
 * This is the main component used in the `/cart` route in Venia.
 * It uses child components to render the different pieces of the cart page.
 *
 * @see {@link https://venia.magento.com/cart}
 *
 * @param {Object} props
 * @param {Object} props.classes CSS className overrides for the component.
 * See [cartPage.css]{@link https://github.com/magento/pwa-studio/blob/develop/packages/venia-ui/lib/components/CartPage/cartPage.css}
 * for a list of classes you can override.
 *
 * @returns {React.Element}
 *
 * @example <caption>Importing into your project</caption>
 * import CartPage from "@magento/venia-ui/lib/components/CartPage";
 */
const CartPage = props => {
    const talonProps = useCartPage({
        queries: {
            getCartDetails: GET_CART_DETAILS
        }
    });

    const {
        cartItems,
        hasItems,
        isCartUpdating,
        setIsCartUpdating,
        shouldShowLoadingIndicator,
        cartData
    } = talonProps;
    const { formatMessage } = useIntl();
    const [, { addToast }] = useToasts();

    const classes = mergeClasses(defaultClasses, props.classes);

    if (shouldShowLoadingIndicator) {
        return fullPageLoadingIndicator;
    }

    const productListing = hasItems ? (
        <ProductListing setIsCartUpdating={setIsCartUpdating} />
    ) : (
        <h3>
            <FormattedMessage
                id={'cartPage.emptyCart'}
                defaultMessage={'There are no items in your cart.'}
            />
        </h3>
    );

    const priceAdjustments = hasItems ? (
        <PriceAdjustments setIsCartUpdating={setIsCartUpdating} />
    ) : null;
    const priceSummary = hasItems ? (
        <PriceSummary isUpdating={isCartUpdating} />
    ) : null;

    return (
        <div className={classes.root}>
            <Title>
                {formatMessage(
                    {
                        id: 'cartPage.title',
                        defaultMessage: 'Cart'
                    },
                    { name: STORE_NAME }
                )}
            </Title>
            <div className={classes.heading_container}>
                <h1 className={classes.heading}>
                    <FormattedMessage
                        id={'cartPage.heading'}
                        defaultMessage={'Cart'}
                    />
                </h1>
                <div className={classes.stockStatusMessageContainer}>
                    <StockStatusMessage cartItems={cartItems} />
                </div>
            </div>
            <div className={classes.body}>
                <div className={classes.items_container}>{productListing}</div>
                {
                    (cartData && cartData.cart && cartData.cart.mp_share_cart_token) ?
                        <React.Fragment>
                            <button id="copy" onClick={() => {
                                let copyText = document.querySelector("#sm-sharecart-token");
                                copyText.select();
                                document.execCommand("copy");
                                addToast({
                                    type: 'info',
                                    message: formatMessage({
                                        id: 'cartPage.sharecartCopied',
                                        defaultMessage: 'Copied!'
                                    }),
                                    timeout: 2000
                                });
                            }}>Share Cart</button>
                            <input style={{ opacity: 0 }} id="sm-sharecart-token" type="text"
                                value={window.location.origin + '/sharecart/' + cartData.cart.mp_share_cart_token} />
                        </React.Fragment>
                        : ''
                }
                <div className={classes.price_adjustments_container}>
                    {priceAdjustments}
                </div>
                <div className={classes.summary_container}>
                    <div className={classes.summary_contents}>
                        {priceSummary}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
