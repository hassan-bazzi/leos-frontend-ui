import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import OrderPage from './pages/OrderPage';
import CheckoutPage from './pages/CheckoutPage';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { getStripeKeysRequest } from './requests/cart';

function App() {
  const [stripePromise, setStripePromise] = useState(false);

  useEffect(() => {
    getStripeKeysRequest().then((response) => {
      setStripePromise(loadStripe(response.publishableKey))
    })
  }, []);

  if (stripePromise) {
    return (
      <Elements stripe={stripePromise}>
        <Router>
          <Switch>
            <Route exact path="/" component={OrderPage} />
            <Route exact path="/checkout" component={CheckoutPage} />
          </Switch>
        </Router>
      </Elements>
    );
  } else {
    return <></>;
  }

}

export default App;
