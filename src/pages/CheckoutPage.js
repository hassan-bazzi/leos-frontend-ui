import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useRouteMatch } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { MaskedTextField, SelectField, TextField, PickupTimeSelectField } from "../components/Fields";
import Navbar from "../components/Navbar";
import FullPageLoading from "../components/FullPageLoading";
import OrderModal from "../components/OrderModal";

import { getMenu } from "../redux/actions/menu.actions";
import { getCart } from "../redux/actions/cart.actions";
import "./CardSectionStyles.css";

import { useEffect } from "react";
import { stateOptions } from "../util/options";
import { paymentRequest } from "../requests/cart";
import Footer from "../components/Footer";

export default function CheckoutPage() {
  const [selectedItem, setSelectedItem] = useState(false);
  const [cardError, setCardError] = useState(false);
  const [billingDetails, setBillingDetails] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [paymentCaptured, setPaymentCaptured] = useState(false);
  const cart = useSelector((state) => state.cart);
  const menu = useSelector((state) => state.menu);
  const dispatch = useDispatch();

  const stripe = useStripe();
  const elements = useElements();

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  useEffect(() => {
    dispatch(getMenu());
    dispatch(getCart());
  }, []);

  async function onSubmit(values) {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        name: values.first_name + " " + values.last_name,
        email: values.email,
        phone: values.phone,
        address: {
          line1: values.street_address,
          city: values.city,
          state: values.state,
          postal_code: values.zip,
        },
      },
    });

    if (result.error) {
      // An error happened when collecting card details,
      // show `result.error.message` in the payment form.
    } else {
      // Otherwise send paymentMethod.id to your server (see Step 3)
      const response = paymentRequest({
        ...values,
        payment_method_id: result.paymentMethod.id,
      });

      const serverResponse = await response;

      if (serverResponse.error) {
        setErrorAlert(
          "There was an issue charging your card. Please confirm your billing details or try a different method of payment."
        );
      } else {
        setBillingDetails(values);
        setPaymentCaptured(true);
      }
    }
  }

  const handleCardChange = (event) => {
    if (event.error) {
      setCardError(event.error.message);
    } else {
      setCardError(false);
    }
  };

  if (!menu.menu) {
    return (
      <>
        <link
          rel="stylesheet"
          href="https://pagecdn.io/lib/font-awesome/5.10.0-11/css/all.min.css"
          integrity="sha256-p9TTWD+813MlLaxMXMbTA7wN/ArzGyW/L7c5+KkjOkM="
          crossorigin="anonymous"
        />
        <div class="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
          <span
            class="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0"
            style={{ top: "50%" }}
          >
            <i class="fas fa-circle-notch fa-spin fa-5x"></i>
          </span>
        </div>
      </>
    );
  }

  if (paymentCaptured) {
    return (
      <div className="min-h-screen">
        {selectedItem && (
          <OrderModal
            item={selectedItem}
            closeModal={() => setSelectedItem(false)}
          />
        )}
        <Navbar hideCart />
        <div className="flex justify-center mt-12 min-w-7xl">
          <div class="bg-white rounded-lg  flex border border-gray-200  flex-col flex-col-reverse sm:flex-row justify-between  overflow-hidden transform transition-all ">
            <div className="flex flex-col py-2 mt-3 mb-auto rounded-lg sm:block sm:w-1/2">
              <p className="items-end pl-2 text-lg font-semibold text-gray-800">
                Order #{cart.id}
              </p>
              <p className="w-full pl-2 font-bold ">
                {billingDetails.first_name + " " + billingDetails.last_name}
              </p>
              <p className="w-full pl-2 mb-8 font-semibold ">
                {billingDetails.pickup_time ? billingDetails.pickup_time : 'ASAP (15-20 minutes)'}
              </p>
              {cart.items.map((cartItem, index) => {
                return (
                  <div className="flex flex-col w-full px-5">
                    <div className="flex items-center">
                      <div className="w-1/6 py-2">{cartItem.quantity}</div>
                      <div className="w-2/3">
                        <div className="text-sm font-semibold text-gray-800">
                          {cartItem.name}
                        </div>
                      </div>
                      <div className="w-1/6 py-2 text-lg font-medium text-gray-700">
                        {"$" + (cartItem.price / 100).toFixed(2)}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      {cartItem.options &&
                        Object.keys(cartItem.options).map((option) => (
                          <div className="flex flex-col">
                            <p className="text-xs font-semibold leading-tight text-gray-500 uppercase pl-1/6 tracking-tigher">
                              {option}
                            </p>
                            <p className="text-xs pl-1/6">
                              {cartItem.options[option]}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                );
              })}
              {billingDetails.tip && (
                <>
                  <p className="w-full px-5 font-semibold text-right">Tip</p>
                  <p className="w-full px-5 font-bold text-right">
                    ${parseFloat(billingDetails.tip).toFixed(2)}
                  </p>{" "}
                </>
              )}
              <p className="w-full px-5 font-semibold text-right">Tax</p>
              <p className="w-full px-5 font-bold text-right">
                ${((cart.totalPrice / 100) * 0.06).toFixed(2)}
              </p>
              <p className="w-full px-5 font-semibold text-right">
                Total Price:
              </p>
              <p className="w-full px-5 font-bold text-right">
                {"$" +
                  (parseFloat(billingDetails.tip)
                    ? (
                      parseFloat(billingDetails.tip) +
                      (cart.totalPrice / 100) * 1.06
                    ).toFixed(2)
                    : ((cart.totalPrice / 100) * 1.06).toFixed(2))}
              </p>
            </div>
            <div class=" bg-gray-100 rounded-lg rounded-l-none max-w-sm p-12 justify-center">
              <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg
                  class="h-6 w-6 text-green-600"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div class="mt-3 justify-center text-center sm:mt-5">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  We have received your order
                </h3>
                <div class="mt-2">
                  <p class="mt-2">
                    Your order will be ready for pickup in 15-20 minutes.
                  </p>
                  <p class="mt-2">Please pick up your order at:</p>
                  <a class="mt-2 font-semibold">
                    4895 Carroll Lake Rd, Commerce Charter Twp, MI 48382
                  </a>
                  <p class="mt-2">If you have any questions, please call:</p>
                  <p class="mt-2 font-semibold">(248) 366-8360</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!cart.loading && cart.items.length === 0) {
    return (
      <div className="min-h-screen">
        {selectedItem && (
          <OrderModal
            item={selectedItem}
            closeModal={() => setSelectedItem(false)}
          />
        )}
        <Navbar />
        <div className="flex justify-center min-w-7xl">
          <div class="bg-gray-50 mt-10 sm:rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-2xl leading-6 font-medium text-gray-900">
                Your cart is empty
              </h3>
              <div class="mt-2 max-w-xl text-xl leading-5 text-gray-500">
                <p>Pick some food from the menu and add it to your cart!</p>
              </div>
              <div class="mt-5">
                <span class="inline-flex rounded-md shadow-sm">
                  <button
                    type="button"
                    onClick={() => {
                      // eslint-disable-next-line
                      location.assign(location.origin + "/");
                    }}
                    class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
                  >
                    View Menu
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={cart.billingDetails ?? {}}
      validate={(values) => {
        const errors = {};
        const fields = [
          "zip",
          "phone",
          "first_name",
          "email",
          "last_name",
          "street_address",
          "city",
          "state",
        ];
        fields.forEach((field) => {
          if (!values[field]) {
            errors[field] = "Required";
          }
        });
        if (values.zip && values.zip.replace("_", "").length !== 5) {
          errors.zip = "Invalid ZIP";
        }
        if (values.phone && values.phone.replace("_", "").length !== 12) {
          errors.phone = "Invalid phone";
        }
        var letters = /^[A-Za-z' ]+$/;
        if (values.first_name && !values.first_name.match(letters)) {
          errors.first_name = "Invalid name";
        }
        if (values.last_name && !values.last_name.match(letters)) {
          errors.last_name = "Invalid name";
        }
        var lettersAndNumbers = /^[A-Za-z0-9 ]+$/;
        if (
          values.street_address &&
          !values.street_address.match(lettersAndNumbers)
        ) {
          errors.street_address = "Invalid street address";
        }
        var email = /\S+@\S+\.\S+$/;
        if (values.email && !values.email.match(email)) {
          errors.email = "Invalid email";
        }

        return errors;
      }}
      render={({ handleSubmit, submitting, pristine, values }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="min-h-screen">
              {selectedItem && (
                <OrderModal
                  item={selectedItem}
                  closeModal={() => setSelectedItem(false)}
                />
              )}
              <Navbar />
              {!cart.loading && (
                <div className="flex min-w-7xl">
                  <div className="flex flex-col mx-2 md:ml-1/6 sm:mr-6 md:w-3/4">
                    <div className="flex flex-col my-6">
                      <h3 className="text-2xl font-bold">Checkout</h3>
                      <h3 className="text-xl font-gray-400">
                        We will text and email you your order confirmation.
                      </h3>
                    </div>
                    {errorAlert && (
                      <div class="bg-red-50 border-l-4 border-red-400 my-4 p-4">
                        <div class="flex">
                          <div class="flex-shrink-0">
                            <svg
                              class="h-5 w-5 text-red-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </div>
                          <div class="ml-3">
                            <p class="text-sm leading-5 text-red-700">
                              {errorAlert}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="flex flex-col px-2 pb-2 sm:flex-row">
                      <div className="flex flex-col py-2 mb-auto bg-gray-100 rounded-lg sm:block sm:w-1/4">
                        <p className="items-end pl-2 text-lg font-semibold text-gray-800">
                          Order Summary
                        </p>
                        {cart.items.map((cartItem, index) => {
                          return (
                            <div className="flex flex-col px-5">
                              <div className="flex items-center">
                                <div className="w-1/6 py-2">
                                  {cartItem.quantity}
                                </div>
                                <div className="w-2/3">
                                  <div className="text-sm font-semibold text-gray-800">
                                    {cartItem.name}
                                  </div>
                                </div>
                                <div className="w-1/6 py-2 text-lg font-medium text-gray-700">
                                  {"$" +
                                    (
                                      (cartItem.price * cartItem.quantity) /
                                      100
                                    ).toFixed(2)}
                                </div>
                              </div>
                              <div className="flex flex-col sm:w-1/2">
                                {cartItem.options &&
                                  Object.keys(cartItem.options).map(
                                    (option) => (
                                      <div className="flex flex-col">
                                        <p className="text-xs font-semibold leading-tight text-gray-500 uppercase pl-1/6 tracking-tigher">
                                          {option}
                                        </p>
                                        <p className="text-xs pl-1/6">
                                          {cartItem.options[option]}
                                        </p>
                                      </div>
                                    )
                                  )}
                              </div>
                            </div>
                          );
                        })}
                        {values.tip && (
                          <>
                            <p className="w-full px-5 font-semibold text-right">
                              Tip
                            </p>
                            <p className="w-full px-5 font-bold text-right">
                              ${parseFloat(values.tip).toFixed(2)}
                            </p>{" "}
                          </>
                        )}
                        <p className="w-full px-5 font-semibold text-right">
                          Tax
                        </p>
                        <p className="w-full px-5 font-bold text-right">
                          ${((cart.totalPrice / 100) * 0.06).toFixed(2)}
                        </p>
                        <p className="w-full px-5 font-semibold text-right">
                          Total Price:
                        </p>
                        <p className="w-full px-5 font-bold text-right">
                          {"$" +
                            (parseFloat(values.tip)
                              ? (
                                parseFloat(values.tip) +
                                (cart.totalPrice / 100) * 1.06
                              ).toFixed(2)
                              : ((cart.totalPrice / 100) * 1.06).toFixed(2))}
                        </p>

                        <div className="flex justify-center pt-6">
                          <a
                            href="/"
                            class="w-1/2 px-2 mb-2 py-1 text-xs text-center font-medium font-semibold leading-5 text-white transition duration-150 ease-in-out bg-red-600 border border-transparent rounded-md hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700"
                          >
                            Back to Menu
                          </a>
                        </div>
                      </div>
                      <div className="flex flex-col sm:w-1/2">
                        <div class="pt-2 sm:ml-8">
                          <div>
                            <h3 class="text-lg font-medium text-gray-900 leading-6">
                              Payment Information
                            </h3>
                          </div>
                          <div class="mt-2 grid grid-cols-2 row-gap-2 col-gap-4 sm:grid-cols-6">
                            <div class="sm:col-span-3">
                              <label
                                for="first_name"
                                class="block text-sm font-medium text-gray-700 leading-5"
                              >
                                First name
                              </label>
                              <div class="mt-1 rounded-md">
                                <TextField
                                  disabled={submitting}
                                  component="input"
                                  name="first_name"
                                  className="block w-full transition duration-150 ease-in-out form-input sm:text-sm sm:leading-5"
                                />
                              </div>
                            </div>

                            <div class="sm:col-span-3">
                              <label
                                for="last_name"
                                class="block text-sm font-medium text-gray-700 leading-5"
                              >
                                Last name
                              </label>
                              <div class="mt-1 rounded-md">
                                <TextField
                                  disabled={submitting}
                                  component="input"
                                  name="last_name"
                                  className="block w-full transition duration-150 ease-in-out form-input sm:text-sm sm:leading-5"
                                />
                              </div>
                            </div>

                            <div class="sm:col-span-3">
                              <label
                                for="email"
                                class="block text-sm font-medium text-gray-700 leading-5"
                              >
                                Email address
                              </label>
                              <div class="mt-1 rounded-md">
                                <TextField
                                  disabled={submitting}
                                  component="input"
                                  name="email"
                                  type="email"
                                  className="block w-full transition duration-150 ease-in-out form-input sm:text-sm sm:leading-5"
                                />
                              </div>
                            </div>
                            <div class="sm:col-span-3">
                              <label
                                for="phone"
                                class="block text-sm font-medium text-gray-700 leading-5"
                              >
                                Cell Phone
                              </label>
                              <div class="mt-1 rounded-md">
                                <MaskedTextField
                                  disabled={submitting}
                                  component="input"
                                  maskType="phone"
                                  name="phone"
                                  type="phone"
                                  class="block w-full form-input transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                />
                              </div>
                            </div>
                            <div class="sm:col-span-6">
                              <label
                                for="street_address"
                                class="block text-sm font-medium text-gray-700 leading-5"
                              >
                                Street address
                              </label>
                              <div class="mt-1 rounded-md">
                                <TextField
                                  disabled={submitting}
                                  component="input"
                                  name="street_address"
                                  class="block w-full form-input transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                />
                              </div>
                            </div>

                            <div class="sm:col-span-2">
                              <label
                                for="city"
                                class="block text-sm font-medium text-gray-700 leading-5"
                              >
                                City
                              </label>
                              <div class="mt-1 rounded-md">
                                <TextField
                                  disabled={submitting}
                                  component="input"
                                  name="city"
                                  className="block w-full transition duration-150 ease-in-out form-input sm:text-sm sm:leading-5"
                                />
                              </div>
                            </div>

                            <div class="sm:col-span-2">
                              <label
                                for="state"
                                class="block text-sm font-medium text-gray-700 leading-5"
                              >
                                State
                              </label>
                              <div class="mt-1 rounded-md">
                                <SelectField
                                  disabled={submitting}
                                  name="state"
                                  options={stateOptions}
                                  initialValue="MI"
                                  class="block w-full form-input transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                />
                              </div>
                            </div>

                            <div class="sm:col-span-2">
                              <label
                                for="zip"
                                class="block text-sm font-medium text-gray-700 leading-5"
                              >
                                ZIP
                              </label>
                              <div class="mt-1 rounded-md">
                                <MaskedTextField
                                  disabled={submitting}
                                  component="input"
                                  name="zip"
                                  maskType="zip"
                                  class="block w-full form-input transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <div class="pt-2 sm:ml-8">
                            <div>
                              <h3 class="text-lg font-medium text-gray-900 leading-6">
                                Pickup Time
                              </h3>
                            </div>
                            <div class="mt-2 grid grid-cols-1 row-gap-2 col-gap-4 sm:grid-cols-1">
                              <div class="sm:col-span-3">
                                <label
                                  for="first_name"
                                  class="block text-sm font-medium text-gray-700 leading-5"
                                >
                                  Select a pickup time
                                </label>
                                <div class="mt-1 rounded-md">
                                  <PickupTimeSelectField name="pickup_time" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="pt-6 sm:ml-8">
                          <div>
                            <h3 class="text-lg font-medium text-gray-900 leading-6">
                              Payment Details
                            </h3>
                          </div>
                          <div class="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
                            <div class="sm:col-span-6">
                              <label
                                for="tip"
                                class="block text-sm font-medium text-gray-700 leading-5"
                              >
                                Add tip? (Optional)
                              </label>
                              <MaskedTextField
                                disabled={submitting}
                                component="input"
                                name="tip"
                                placeholder="0.00"
                                maskType="decimal"
                                class="block w-full form-input transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                              />
                            </div>
                            <div class="sm:col-span-6">
                              <CardElement
                                onChange={handleCardChange}
                                options={CARD_ELEMENT_OPTIONS}
                              />
                              {cardError && (
                                <p className="text-sm text-red-500">
                                  {cardError}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="my-12">
                            {submitting && (
                              <>
                                <link
                                  rel="stylesheet"
                                  href="https://pagecdn.io/lib/font-awesome/5.10.0-11/css/all.min.css"
                                  integrity="sha256-p9TTWD+813MlLaxMXMbTA7wN/ArzGyW/L7c5+KkjOkM="
                                  crossorigin="anonymous"
                                />
                                <div class="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
                                  <span
                                    class="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0"
                                    style={{ top: "50%" }}
                                  >
                                    <i class="fas fa-circle-notch fa-spin fa-5x"></i>
                                  </span>
                                </div>
                              </>
                            )}
                            <button
                              type="submit"
                              disabled={submitting}
                              className="flex justify-between w-full px-4 py-2 text-sm text-lg font-medium font-semibold leading-5 text-white transition duration-150 ease-in-out bg-red-600 border border-transparent rounded-md hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700"
                            >
                              <div>Checkout</div>
                              <div>
                                {"$" +
                                  (parseFloat(values.tip)
                                    ? (
                                      parseFloat(values.tip) +
                                      (cart.totalPrice / 100) * 1.06
                                    ).toFixed(2)
                                    : ((cart.totalPrice / 100) * 1.06).toFixed(
                                      2
                                    ))}
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex items-center p-12 mt-4 text-gray-800 bg-gray-100 rounded-lg md:ml-1/6 sm:mr-6 md:w-3/4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="50pt"
                  version="1.1"
                  viewBox="-38 0 512 512.00142"
                  width="50pt"
                  class="pr-4"
                >
                  <g id="surface1">
                    <path
                      d="M 435.488281 138.917969 L 435.472656 138.519531 C 435.25 133.601562 435.101562 128.398438 435.011719 122.609375 C 434.59375 94.378906 412.152344 71.027344 383.917969 69.449219 C 325.050781 66.164062 279.511719 46.96875 240.601562 9.042969 L 240.269531 8.726562 C 227.578125 -2.910156 208.433594 -2.910156 195.738281 8.726562 L 195.40625 9.042969 C 156.496094 46.96875 110.957031 66.164062 52.089844 69.453125 C 23.859375 71.027344 1.414062 94.378906 0.996094 122.613281 C 0.910156 128.363281 0.757812 133.566406 0.535156 138.519531 L 0.511719 139.445312 C -0.632812 199.472656 -2.054688 274.179688 22.9375 341.988281 C 36.679688 379.277344 57.492188 411.691406 84.792969 438.335938 C 115.886719 468.679688 156.613281 492.769531 205.839844 509.933594 C 207.441406 510.492188 209.105469 510.945312 210.800781 511.285156 C 213.191406 511.761719 215.597656 512 218.003906 512 C 220.410156 512 222.820312 511.761719 225.207031 511.285156 C 226.902344 510.945312 228.578125 510.488281 230.1875 509.925781 C 279.355469 492.730469 320.039062 468.628906 351.105469 438.289062 C 378.394531 411.636719 399.207031 379.214844 412.960938 341.917969 C 438.046875 273.90625 436.628906 199.058594 435.488281 138.917969 Z M 384.773438 331.523438 C 358.414062 402.992188 304.605469 452.074219 220.273438 481.566406 C 219.972656 481.667969 219.652344 481.757812 219.320312 481.824219 C 218.449219 481.996094 217.5625 481.996094 216.679688 481.820312 C 216.351562 481.753906 216.03125 481.667969 215.734375 481.566406 C 131.3125 452.128906 77.46875 403.074219 51.128906 331.601562 C 28.09375 269.097656 29.398438 200.519531 30.550781 140.019531 L 30.558594 139.683594 C 30.792969 134.484375 30.949219 129.039062 31.035156 123.054688 C 31.222656 110.519531 41.207031 100.148438 53.765625 99.449219 C 87.078125 97.589844 116.34375 91.152344 143.234375 79.769531 C 170.089844 68.402344 193.941406 52.378906 216.144531 30.785156 C 217.273438 29.832031 218.738281 29.828125 219.863281 30.785156 C 242.070312 52.378906 265.921875 68.402344 292.773438 79.769531 C 319.664062 91.152344 348.929688 97.589844 382.246094 99.449219 C 394.804688 100.148438 404.789062 110.519531 404.972656 123.058594 C 405.0625 129.074219 405.21875 134.519531 405.453125 139.683594 C 406.601562 200.253906 407.875 268.886719 384.773438 331.523438 Z M 384.773438 331.523438 "
                      style={{
                        stroke: "none",
                        fillRule: "nonzero",
                        fill: "rgb(0%,0%,0%)",
                        fillOpacity: "1",
                      }}
                    />
                    <path
                      d="M 217.996094 128.410156 C 147.636719 128.410156 90.398438 185.652344 90.398438 256.007812 C 90.398438 326.367188 147.636719 383.609375 217.996094 383.609375 C 288.351562 383.609375 345.59375 326.367188 345.59375 256.007812 C 345.59375 185.652344 288.351562 128.410156 217.996094 128.410156 Z M 217.996094 353.5625 C 164.203125 353.5625 120.441406 309.800781 120.441406 256.007812 C 120.441406 202.214844 164.203125 158.453125 217.996094 158.453125 C 271.785156 158.453125 315.546875 202.214844 315.546875 256.007812 C 315.546875 309.800781 271.785156 353.5625 217.996094 353.5625 Z M 217.996094 353.5625 "
                      style={{
                        stroke: "none",
                        fillRule: "nonzero",
                        fill: "rgb(0%,0%,0%)",
                        fillOpacity: "1",
                      }}
                    />
                    <path
                      d="M 254.667969 216.394531 L 195.402344 275.660156 L 179.316406 259.574219 C 173.449219 253.707031 163.9375 253.707031 158.070312 259.574219 C 152.207031 265.441406 152.207031 274.953125 158.070312 280.816406 L 184.78125 307.527344 C 187.714844 310.460938 191.558594 311.925781 195.402344 311.925781 C 199.246094 311.925781 203.089844 310.460938 206.023438 307.527344 L 275.914062 237.636719 C 281.777344 231.769531 281.777344 222.257812 275.914062 216.394531 C 270.046875 210.523438 260.535156 210.523438 254.667969 216.394531 Z M 254.667969 216.394531 "
                      style={{
                        stroke: "none",
                        fillRule: "nonzero",
                        fill: "rgb(0%,0%,0%)",
                        fillOpacity: "1",
                      }}
                    />
                  </g>
                </svg>
                Your credit card details never stored on our servers. We use 256
                bit SSL encryption to keep your information safe.
              </div>
              <Footer />
            </div>
          </form>
        );
      }}
    />
  );
}
