import React from "react";
import _ from "lodash";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import { useSelector } from "react-redux";
import { Field } from "react-final-form";
import { stateOptions } from "../util/options";
import generateTimeOptions from "../util/generate-time-options";

export function TextField({ name, type, ...otherProps }) {
  return (
    <Field component="input" name={name} type={type} required>
      {({ input, meta }) => (
        <div>
          <div className="relative mt-1 rounded-md">
            <input
              name={name}
              className={
                "appearance-none block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none transition duration-150 ease-in-out sm:text-sm sm:leading-5 " +
                (meta.error && meta.touched
                  ? "border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red"
                  : "border-gray-300 focus:shadow-outline-blue focus:border-blue-300")
              }
              {...input}
              {...otherProps}
            />
          </div>
          {meta.error && meta.touched && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
          <p className="mt-2 text-sm text-red-600">
            {meta.touched && meta.error}
          </p>
        </div>
      )}
    </Field>
  );
}

export function CheckboxField({ name, type, ...otherProps }) {
  return (
    <Field component="input" name={name} type={type} required>
      {({ input, meta }) => (
        <div>
          <div className="relative mt-1 rounded-md">
            <input
              name={name}
              className={
                "appearance-none block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none transition duration-150 ease-in-out sm:text-sm sm:leading-5 " +
                (meta.error && meta.touched
                  ? "border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red"
                  : "border-gray-300 focus:shadow-outline-blue focus:border-blue-300")
              }
              {...input}
              {...otherProps}
            />
          </div>
          {meta.error && meta.touched && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
          <p className="mt-2 text-sm text-red-600">
            {meta.touched && meta.error}
          </p>
        </div>
      )}
    </Field>
  );
}

export function MaskedTextField({ name, maskType, ...otherProps }) {
  const maskLookup = {
    decimal: createNumberMask({
      prefix: "",
      requireDecimal: true,
      decimalLimit: 2,
      allowDecimal: true,
      includeThousandsSeparator: false,
    }),
    bank: createNumberMask({
      prefix: "",
      integerLimit: 20,
      includeThousandsSeparator: false,
    }),
    integer: createNumberMask({ prefix: "" }),
    date: [/\d/, /\d/, "-", /\d/, /\d/, "-", /[1-2]/, /\d/, /\d/, /\d/],
    phone: [
      /[1-9]/,
      /\d/,
      /\d/,
      "-",
      /\d/,
      /\d/,
      /\d/,
      "-",
      /\d/,
      /\d/,
      /\d/,
      /\d/,
    ],
    zip: [/\d/, /\d/, /\d/, /\d/, /\d/],
    routing: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
    ssn: [/\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/],
  };

  return (
    <Field name={name} initialValue={otherProps.initialValue} required>
      {({ input, meta }) => {
        return (
          <div>
            <div className="relative mt-1 rounded-md ">
              <MaskedInput
                mask={maskLookup[maskType]}
                className={
                  "appearance-none block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none transition duration-150 ease-in-out sm:text-sm sm:leading-5 " +
                  (meta.error && meta.touched
                    ? "border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red"
                    : "border-gray-300 focus:shadow-outline-blue focus:border-blue-300")
                }
                initialValue={otherProps.initialValue}
                {...input}
                {...otherProps}
              />
            </div>
            {meta.error && meta.touched && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
            <p className="mt-2 text-sm text-red-600">
              {meta.touched && meta.error}
            </p>
          </div>
        );
      }}
    </Field>
  );
}

export function SelectField({ name, options, initialValue }) {
  return (
    <div className="relative flex flex-col">
      <Field name={name} component="select" initialValue={initialValue}>
        {({ meta, input }) => (
          <>
            <div className="absolute right-0 pt-3 pr-2">
              <svg
                version="1.1"
                class="fill-current h-4 w-4"
                viewBox="0 0 20 20"
              >
                <path
                  d="M17.418,6.109c0.272-0.268,0.709-0.268,0.979,0s0.271,0.701,0,0.969l-7.908,7.83
	c-0.27,0.268-0.707,0.268-0.979,0l-7.908-7.83c-0.27-0.268-0.27-0.701,0-0.969c0.271-0.268,0.709-0.268,0.979,0L10,13.25
	L17.418,6.109z"
                />
              </svg>
            </div>
            <select
              {...input}
              name={name}
              className={
                "block w-full px-3 py-2 border rounded-md  appearance-none focus:outline-none transition duration-150 ease-in-out sm:text-sm sm:leading-5 " +
                (meta.error && meta.touched
                  ? "border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red"
                  : "border-gray-300 focus:shadow-outline-blue focus:border-blue-300")
              }
            >
              {options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  selected={initialValue === option.value ? 'selected' : false}
                >
                  {option.name}
                </option>
              ))}
            </select>
            <p className="mt-2 text-sm text-red-600">
              {meta.touched && meta.error}
            </p>
          </>
        )}
      </Field>
    </div>
  );
}

export function PickupTimeSelectField({ name }) {
  return <SelectField name={name} options={generateTimeOptions()} />;
}

export function AddressFieldGroup({ name }) {
  const deal = useSelector((state) => state.deal);
  const addressRootName = name.replace(".full_address", "");
  const initialValues = _.get(deal.application, addressRootName);

  return (
    <div className="flex flex-col">
      <div className="w-full text-xs text-center lg:text-left ">
        Street
        <TextField
          name={`${addressRootName}.address`}
          initialValue={initialValues.address}
        />
      </div>
      <div className="w-full text-xs text-center lg:text-left ">
        City
        <TextField
          name={`${addressRootName}.city`}
          initialValue={initialValues.city}
        />
      </div>
      <div className="w-full text-xs text-center lg:text-left ">
        State
        <SelectField
          name={`${addressRootName}.state`}
          options={stateOptions}
          initialValue={initialValues.state}
        />
      </div>
      <div className="w-full text-xs text-center lg:text-left ">
        Zip
        <TextField
          name={`${addressRootName}.postal_code`}
          initialValue={initialValues.postal_code}
        />
      </div>
    </div>
  );
}
export default TextField;
