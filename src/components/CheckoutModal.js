import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../redux/actions/cart.actions";

export default function CheckoutModal({ closeModal }) {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const closeIfEsc = ev => {
    if (ev.keyCode === 27) {
      closeModal();
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", closeIfEsc, false);
  }, []);

  return (
    <div className="fixed inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center">
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div className="top-0 px-4 pt-5 pb-4 mt-4 overflow-hidden overflow-y-auto transition-all transform bg-white rounded-lg shadow-xl max-h-128 sm:max-h-screen sm:max-w-xl sm:w-full sm:p-6">
        <button
          onClick={closeModal}
          className="inline-flex text-gray-400 transition duration-150 ease-in-out focus:outline-none focus:text-gray-500"
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <div className="flex flex-col py-5">
          <div className="px-5 pb-4 border-b">
            <p className="text-lg font-bold text-red-700">
              This is a Pickup order
            </p>
            <p className="text-lg font-semibold text-gray-700">
              You'll need to go to Leo's Coney Island to pick up this order.
            </p>
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
                    Object.keys(cartItem.options).map(option => (
                      <div className="flex flex-col">
                        <p className="text-xs font-bold leading-tight text-gray-500 uppercase pl-1/6 tracking-tigher">
                          {option}
                        </p>
                        <p className="text-sm pl-1/6">
                          {cartItem.options[option]}
                        </p>
                      </div>
                    ))}
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

          <div className="my-14">
            <button
              onClick={()=>{
                // eslint-disable-next-line
                location.assign(location.origin + "/checkout");
              }}
              type="button"
              className="flex justify-between w-full px-4 py-2 text-sm text-lg font-medium font-semibold leading-5 text-white transition duration-150 ease-in-out bg-red-600 border border-transparent rounded-md hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700"
            >
              <div>Checkout</div>
              <div>{"$" + (cart.totalPrice / 100).toFixed(2)}</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
