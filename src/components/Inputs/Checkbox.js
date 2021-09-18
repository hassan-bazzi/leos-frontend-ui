import React from "react";
import { Field, useField } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";

const CheckboxGroup = ({ name, fields, options, minNum, maxNum, extraOptions, extraId }) => {
  const toggle = (event, option) => {
    if (maxNum === 1 && minNum !== 0) {
      fields.remove(0);
      fields.push(option);
      return;
    }
    if (event.target.checked && fields.length + 1 <= maxNum) {
      fields.push(option);
    } else if (!event.target.checked) {
      fields.remove(option);
    }
  };
  return (
    <div>
      {options.map((optionId, oi) => {
        const option = options.filter(o => o.id === optionId.id);
        return (
          <>
            {option[0].parentExtraId === extraId && (
              <label key={option} class="flex my-1 custom-checkbox">
                <div class="flex items-center justify-center w-6 h-6 p-1 mr-2 bg-white border-gray-400 shadow">
                  <input
                    type="checkbox"
                    class="hidden"
                    checked={
                      fields.value && fields.value.includes(option[0].name)
                    }
                    onClick={event => toggle(event, option[0].name)}
                  />
                  <svg
                    class="hidden w-4 h-4 text-green-600 pointer-events-none"
                    viewBox="0 0 172 172"
                  >
                    <g
                      fill="none"
                      stroke-width="none"
                      stroke-miterlimit="10"
                      font-family="none"
                      font-weight="none"
                      font-size="none"
                      text-anchor="none"
                      style={{ mixBlendMode: "normal" }}
                    >
                      <path d="M0 172V0h172v172z" />
                      <path
                        d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z"
                        fill="currentColor"
                        stroke-width="1"
                      />
                    </g>
                  </svg>
                </div>
                <span class="select-none">{option[0].name}</span>
                {option[0].price > 0 && (
                  <span class="p-1 ml-2 font-medium bg-gray-200 select-none rounded-md ">
                    {"+ $" + (option[0].price / 100).toFixed(2)}
                  </span>
                )}
              </label>
            )}
          </>
        );
      })}
    </div>
  );
};

export default function Checkbox({
  label,
  inputName,
  itemOptions,
  extraOptions,
  extraId,
  maxNum,
  minNum,
  multiSelect
}) {
  const field = useField('options.' + inputName);
  return (
    <div>
      <div className="flex justify-between mb-2 border-b border-gray-300">
        <h3 className="pt-3 text-lg font-semibold ">{inputName}</h3>
        {minNum > 0 && (
          <h3 className="pt-3 text-orange-700 text-md ">Select {maxNum}</h3>
        )}
      </div>
      <FieldArray
        name={'options.' + inputName}
        component={CheckboxGroup}
        validate={(values) => {
          if ((! values || values.length < minNum) && minNum > 0) {
            return 'Please select ' + minNum;
          }
        }}
        options={itemOptions}
        extraId={extraId}
        extraOptions={extraOptions}
        maxNum={maxNum}
        minNum={minNum}
      />
      <h3>{field.meta.error}</h3>
    </div>
  );
}
