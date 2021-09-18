import React, { useState, useEffect } from "react";
import arrayMutators from "final-form-arrays";
import { useDispatch, useSelector } from "react-redux";
import { Form, Field } from "react-final-form";
import Checkbox from "./Inputs/Checkbox";
import { addItem } from "../redux/actions/cart.actions";

export default function OrderModal({ item, closeModal }) {
  const dispatch = useDispatch();
  const [itemData, setItemData] = useState({});
  const cart = useSelector(state => state.cart.items);

  async function onSubmit(values) {
    values.price = calcTotal(values);
    values.quantity = parseFloat(values.quantity)
    dispatch(addItem(values));
    closeModal();
  }

  const closeIfEsc = ev => {
    if (ev.keyCode === 27) {
      closeModal();
    }
  };

  const calcTotal = values => {
    let price = itemData.item.price;
    if (itemData.extras) {
      itemData.extras.forEach(extra => {
        if (values.options && values.options[extra.name]) {
          values.options[extra.name].forEach(value => {
            const selectedOptions = itemData.options.filter(
              o => o.name === value
            );
            selectedOptions.forEach(selectedOption => {
              price += selectedOption.price;
            });
          });
        }
      });
    }

    return price * (itemData.item.quantity ?? 1);
  };

  useEffect(() => {
    const data = require("../assets/menu/items/" + item.id + ".json");
    setItemData(data.data.menuItem);

    document.addEventListener("keydown", closeIfEsc, false);
  }, []);

  return (
    <div className="fixed inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center">
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      {itemData.item && (
        <Form
          onSubmit={onSubmit}
          initialValues={{
            name: itemData.item.name,
            price: itemData.item.price
          }}
          validate={values => {
            const errors = {};
            return errors;
          }}
          mutators={{
            ...arrayMutators
          }}
          render={({ handleSubmit, submitting, pristine, values }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div className="top-0 w-full px-4 pt-5 pb-4 mt-4 overflow-hidden overflow-y-auto transition-all transform bg-white rounded-lg shadow-xl sm:w-128 max-h-128 sm:max-h-screen sm:min-w-2xl sm:p-6">
                  <button
                    onClick={closeModal}
                    className="inline-flex text-gray-400 transition duration-150 ease-in-out focus:outline-none focus:text-gray-500"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <div>
                    <div className="sm:mt-5">
                      <h3 className="text-xl font-bold leading-6 text-gray-900">
                        {item.name}
                      </h3>
                      <div className="mt-2">
                        <p className="text-lg leading-5 text-gray-500">
                          {item.description}
                        </p>
                      </div>
                      <div className="mt-2">
                        {item.imageUrl ? (
                          <img
                            className="w-full rounded-lg"
                            src={item.imageUrl}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                  {itemData.extras &&
                    itemData.extras.map((extra, index) => {
                      return (
                        <Checkbox
                          inputName={extra.name}
                          extraId={extra.id}
                          itemOptions={itemData.options}
                          extraOptions={extra.options}
                          maxNum={extra.maxNumOptions}
                          minNum={extra.minNumOptions}
                        />
                      );
                    })}
                  <div className="w-full p-4 mt-5 border border-gray-200 rounded sm:mt-6">
                    <h3 className="font-bold">Additional Notes</h3>
                    <Field
                      component="textarea"
                      name="notes"
                      placeholder="Enter additional notes here"
                      className="box-border w-full pt-2"
                      maxLength={200}
                    />
                  </div>
                  <div className="flex flex-row items-center justify-center mt-4">
                      <h3 className="font-bold align-bottom">Quantity: </h3>
                      <Field
                        component="input"
                        type="number"
                        name="quantity"
                        min={1}
                        max={100}
                        defaultValue={1}
                        step={1}
                        placeholder="1"
                        className="box-border w-1/3 pt-2 pl-2 ml-4 form-input"
                      />
                    </div>
                  <div className="flex flex-row mt-5 sm:mt-6">
                    <span className="flex w-full rounded-md shadow-sm">
                      <button
                        type="submit"
                        className="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red sm:text-sm sm:leading-5"
                      >
                        {"Add to order - $" +
                          (calcTotal(values) / 100).toFixed(2)}
                      </button>
                    </span>
                  </div>
                </div>
              </form>
            );
          }}
        />
      )}
    </div>
  );
}
