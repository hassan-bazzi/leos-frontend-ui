import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import OrderPage from './pages/OrderPage';
import CheckoutPage from './pages/CheckoutPage';
// import PageNotFound from './pages/PageNotFound';
import generateTimeOptions from './util/generate-time-options';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
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
            <Route exact path="/login">
              <LoginPage />
            </Route>
            {/* <Route component={PageNotFound} /> */}
          </Switch>
        </Router>
      </Elements>
    );
  } else {
    return <></>;
  }

}

export default App;
