import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSizes } from "@/actions/productsActions.js";
import axios from "axios";

const CheckSizes = ({ formik }) => {
  const sizes = useSelector((state) => state?.products.sizes);
  const dispatch = useDispatch();

  const fetchSizes = useCallback(async () => {
    try {
      const res = await axios.get(`../../api/attributes/talles`);

      dispatch(getSizes(res.data));
    } catch (error) {
      if (error.response?.status === 404) {
        console.log("ERROR");
      } else {
        console.log("OTRO ERROR", error);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    fetchSizes();
  }, [fetchSizes]);

  return (
    <div className="flex gap-4 flex-wrap">
      {sizes?.map((el, index) => (
        <React.Fragment key={index}>
          <div className="w-24" key={index}>
            <input
              name="idSize"
              type="checkbox"
              value={el.id}
              checked={formik.values.sizes.includes(el.id)}
              className="w-4 h-4 red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
              onChange={(event) => {
                const isChecked = event.target.checked;
                let newOptions = formik.values.sizes;
                if (isChecked) {
                  newOptions.push(el.id);
                } else {
                  newOptions = newOptions.filter((option) => option !== el.id);
                }
                formik.setFieldValue("sizes", newOptions);
              }}
            />
            <label className="ml-2"> {el.talle} </label>
          </div>
          {(index === 7 || index === 28) && (
            <div className="w-full" key={index + "hr"}>
              <hr className="bg-th-primary-light h-px border-0 " />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CheckSizes;
