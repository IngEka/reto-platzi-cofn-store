/* eslint-disable no-console */
import React, { useContext } from 'react';
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2';
import AppContext from '../context/AppContext';
import handleSumTotal from '../utils/handleSumTotal';
import '../styles/Payment.css';

function Payment() {
  const navegate = useNavigate();
  const {
    state: { cart, buyer },
    addNewOrder,
  } = useContext(AppContext);

  const paypalOtions = {
    clientId:
      'Ac4QzGrR__0JHmjve6jCyhnzrRsT4O3pTjwCNcoKtV69ncMm7uo5xtpxRBceHHNs5gsl1VByBwh9LcmF',
    intent: 'capture',
    currency: 'USD',
  };

  const buttonStyles = {
    layout: 'horizontal',
    shape: 'pill',
    color: 'blue',
  };

  const handlePaymentSuccess = (data) => {
    if (data.status === 'COMPLETED') {
      const newOrder = {
        buyer,
        product: cart,
        payment: data,
      };
      addNewOrder(newOrder);
      navegate('/checkout/success');
    }
  };

  return (
    <>
      <Helmet>
        <title>Pagos - Erika Store</title>
      </Helmet>
      <div className="Payment">
        <div className="Payment-content">
          <div className='Payment-description'> 
            <h3>Resumen del pedido: </h3>
            {cart.map((item) => (
              <div className="Payment-item" key={item.id}>
                <div className="Payment-element">
                  <h4>{item.title}</h4>
                  <span>$ {item.price}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="Payment-button">
            {cart.length > 0 && (
              <PayPalButton
                paypalOptions={paypalOtions}
                buttonStyles={buttonStyles}
                amount={handleSumTotal()}
                onStart={() => console.log('Start Payment')}
                onSuccess={(data) => handlePaymentSuccess(data)}
                onError={(error) => console.log(error)}
                onCancel={(data) => console.log(data)}
              />
            )}
          </div>
        </div>
        <div>
          <h4>Informacion general </h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo voluptatem quibusdam voluptas nostrum delectus nemo modi quod quis sit, nisi repellendus sapiente? Cupiditate non, odit dolores amet earum ipsam numquam.</p>
        </div>
      </div>
    </>
  );
}

export default Payment;
