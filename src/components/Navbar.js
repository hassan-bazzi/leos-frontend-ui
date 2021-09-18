import React, { useState } from "react";
import Logo from "../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import CartModal from "../components/CartModal";

export default function Navbar({ hideCart }) {
  const [open, setOpen] = useState(false);
  const cart = useSelector((state) => state.cart.items);
  const [openCart, setOpenCart] = useState(false);

  return (
    <>
      {openCart && <CartModal closeModal={() => setOpenCart(false)} />}
      <nav className="flex bg-white border-b border-gray-200 ">
        <div className="flex w-full px-4 m-auto sm:px-6 lg:px-10">
          <div></div>
          <div className="flex flex-col items-center justify-center w-full text-lg font-bold">
            {process.env.REACT_APP_ENV !== "uat" && (
              <div class="flex items-center">
                <a href="/"><img
                  src={Logo}
                  alt="Leo's Coney Island Logo"
                  className="w-24 p-2"
                /></a>
                <div>Leo's Coney Island Online Ordering</div>
              </div>
            )}
            {process.env.REACT_APP_ENV === "uat" && (
              <div class="text-xs">
                {" "}
                THIS IS A TEST ENVIRONMENT YOUR ORDER WILL NOT BE PROCESSED
              </div>
            )}
            {process.env.REACT_APP_ENV === "uat" && (
              <div class="text-xs">
                {" "}
                VISIT LEOSCOMMERCE.COM TO PLACE AN ORDER
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center ml-auto mr-10">
          {!hideCart && (
            <button
              className="flex items-center px-2 py-2 bg-red-600 rounded-lg"
              onClick={() => setOpenCart(true)}
            >
              <svg
                height="24pt"
                className="text-white fill-current"
                viewBox="0 -31 512.00033 512"
                width="24pt"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m166 300.003906h271.003906c6.710938 0 12.597656-4.4375 14.414063-10.882812l60.003906-210.003906c1.289063-4.527344.40625-9.390626-2.433594-13.152344-2.84375-3.75-7.265625-5.964844-11.984375-5.964844h-365.632812l-10.722656-48.25c-1.523438-6.871094-7.617188-11.75-14.648438-11.75h-91c-8.289062 0-15 6.710938-15 15 0 8.292969 6.710938 15 15 15h78.960938l54.167968 243.75c-15.9375 6.929688-27.128906 22.792969-27.128906 41.253906 0 24.8125 20.1875 45 45 45h271.003906c8.292969 0 15-6.707031 15-15 0-8.289062-6.707031-15-15-15h-271.003906c-8.261719 0-15-6.722656-15-15s6.738281-15 15-15zm0 0" />
                <path d="m151 405.003906c0 24.816406 20.1875 45 45.003906 45 24.8125 0 45-20.183594 45-45 0-24.8125-20.1875-45-45-45-24.816406 0-45.003906 20.1875-45.003906 45zm0 0" />
                <path d="m362.003906 405.003906c0 24.816406 20.1875 45 45 45 24.816406 0 45-20.183594 45-45 0-24.8125-20.183594-45-45-45-24.8125 0-45 20.1875-45 45zm0 0" />
              </svg>
              <p className="w-full font-bold text-white">- {cart.length}</p>
            </button>
          )}
        </div>
      </nav>
    </>
  );
}
