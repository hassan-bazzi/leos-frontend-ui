import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Menu from "../components/Menu";
import OrderModal from "../components/OrderModal";

import { getMenu } from "../redux/actions/menu.actions";
import { removeItem, getCart, clearCart } from "../redux/actions/cart.actions";

import { useEffect } from "react";
import Footer from "../components/Footer";
import UpArrowIcon from "../assets/images/svg-icons/up-arrow";
import { LoadingSpinner } from "../components/LoadingSpinner";

export default function OrderPage() {
  const cart = useSelector((state) => state.cart);
  const menu = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "scroll",
      function () {
        var target = document.getElementById("scroller");
        if (target && window.pageYOffset > 500) {
          target.style.display = "block";
        } else if (target && window.pageYOffset < 500) {
          target.style.display = "none";
        }
      },
      false
    );
    dispatch(getMenu());
    dispatch(getCart());
  }, []);

  if (!menu.menu) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <div className="min-h-screen">
      {selectedItem && (
        <OrderModal
          item={selectedItem}
          closeModal={() => setSelectedItem(false)}
        />
      )}
      <Navbar />
      <div className="flex min-h-screen min-w-7xl">
        <div className="flex flex-col mx-2 md:ml-1/6 sm:mr-6 md:w-3/4">
          <div className="flex flex-col">
            <Header />
            <Menu setSelectedItem={setSelectedItem} />
          </div>
        </div>
        <div className="flex flex-col hidden w-1/4 py-5 border border-t-0 border-gray-100 border-gray-200 border-l-1 sm:block">
          <div className="px-5 border-b ">
            <p className="text-lg font-bold text-red-700">
              This is a Pickup order
            </p>
            <p className="text-lg font-semibold text-gray-700">
              You'll need to go to Leo's Coney Island to pick up this order.
            </p>
            <div className="my-14">
              <button
                type="button"
                onClick={() => {
                  // eslint-disable-next-line
                  location.assign(location.origin + "/checkout");
                }}
                className="flex justify-between w-full px-4 py-2 text-sm text-lg font-medium font-semibold leading-5 text-white transition duration-150 ease-in-out bg-red-600 border border-transparent rounded-md hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700"
              >
                <div>Checkout</div>
                <div>{"$" + (cart.totalPrice / 100).toFixed(2)}</div>
              </button>
            </div>
          </div>
          {cart.items.map((cartItem, index) => {
            return (
              <div className="flex flex-col px-5 py-5 border-b">
                <div className="flex items-center">
                  <div className="w-1/6 py-2">{cartItem.quantity}</div>
                  <div className="w-2/3">
                    <div className="font-semibold text-gray-800">
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
                        <p className="text-xs font-bold leading-tight text-gray-500 uppercase pl-1/6 tracking-tigher">
                          {option}
                        </p>
                        <p className="text-sm pl-1/6">
                          {cartItem.options[option]}
                        </p>
                      </div>
                    ))}
                  {cartItem.notes && (
                    <div className="flex flex-col">
                      <p className="text-xs font-bold leading-tight text-gray-500 uppercase pl-1/6 tracking-tigher">
                        Notes
                      </p>
                      <p className="text-sm pl-1/6">{cartItem.notes}</p>
                    </div>
                  )}
                </div>
                <div className="flex">
                  <button
                    type="button"
                    className="py-1 font-medium font-bold text-red-700"
                    onClick={() => dispatch(removeItem(index))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
          <span class="justify-center mt-4 inline-flex w-full rounded-md">
            <button
              type="button"
              className="flex justify-between w-1/2 px-2 py-1 mt-2 text-sm font-medium font-semibold leading-5 text-white transition duration-150 ease-in-out bg-gray-600 border border-transparent rounded-md hover:bg-gray-500 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-700"
              onClick={() => dispatch(clearCart())}
            >
              <svg
                class="-ml-0.5 mr-2 h-4 w-4"
                fill="currentColor"
                enable-background="new 0 0 515.556 515.556"
                height="512"
                viewBox="0 0 515.556 515.556"
                width="512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m64.444 451.111c0 35.526 28.902 64.444 64.444 64.444h257.778c35.542 0 64.444-28.918 64.444-64.444v-322.222h-386.666z" />
                <path d="m322.222 32.222v-32.222h-128.889v32.222h-161.111v64.444h451.111v-64.444z" />
              </svg>
              Clear cart
            </button>
          </span>
        </div>
        <div
          id="scroller"
          className="fixed bottom-0 right-0 z-40 p-4 text-2xl font-bold text-white bg-red-600 rounded-full md:mb-24 md:mr-24"
          onClick={() => window.scrollTo(0, 0)}
        >
          <UpArrowIcon />
        </div>
      </div>
      <Footer />
    </div>
  );
}
