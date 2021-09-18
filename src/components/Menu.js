import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMenu } from "../redux/actions/menu.actions";

export function MenuCategories() {
  const menu = useSelector(state => state.menu.menu);
  return (
    <div>
      <div className="sm:hidden">
        <select
          className="block w-full form-select"
          onChange={ev => {
            // eslint-disable-next-line
            location.assign(location.origin + "/#" + ev.target.value);
          }}
        >
          {menu.menuCategories.map((category, index) => (
            <option>{category.title}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {menu.menuCategories.map(
              (category, index) =>
                index < 6 && (
                  <a
                    href={"/#" + category.title}
                    className="w-1/6 px-1 py-4 text-sm font-medium leading-5 text-center text-gray-500 border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300"
                  >
                    {category.title}
                  </a>
                )
            )}
            <select
              className="block mb-3 form-select"
              onChange={ev => {
                // eslint-disable-next-line
                location.assign(location.origin + "/#" + ev.target.value);
              }}
            >
              <option disabled selected>
                More...
              </option>
              {menu.menuCategories.map(
                (category, index) =>
                  index >= 6 && (
                    <option value={category.title}>{category.title}</option>
                  )
              )}
            </select>
          </nav>
        </div>
      </div>
    </div>
  );
}
export default function Menu({ setSelectedItem }) {
  const menu = useSelector(state => state.menu.menu);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMenu());
  }, []);

  return (
    <div>
      <MenuCategories />
      {menu.menuCategories.map((category, index) => (
        <>
          <h3 id={category.title} className="py-4 text-2xl font-bold">
            {category.title}
          </h3>
          <div className="grid w-full grid-cols-1 gap-2 mb-4 md:grid-cols-2">
            {category.items.map((item, ii) => (
              <div
                onClick={() => setSelectedItem(item)}
                className="flex justify-between border border-gray-200 rounded-md cursor-pointer "
              >
                <div className="flex flex-col py-4 pl-4 ">
                  <h4 className="font-semibold text-md">{item.name}</h4>
                  <p className="text-xs break-words sm:text-base">
                    {item.description.substr(0, 100) +
                      (item.description.length > 100 ? "..." : "")}
                  </p>
                  <span className="font-semibold">
                    ${(item.price / 100).toFixed(2)}
                  </span>
                </div>
                {item.imageUrl ? (
                  <img className="object-cover w-1/2 rounded-sm rounded-l-none" src={item.imageUrl} />
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        </>
      ))}
    </div>
  );
}
