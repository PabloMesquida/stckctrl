import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSizes } from "@/actions/productsActions.js";
import axios from "axios";

const CheckOptions = ({ formik }) => {
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
    <div>
      {sizes.map((el) => (
        <div key={el.id}>
          <label>
            <input
              name="idSize"
              type="checkbox"
              value={el.id}
              checked={formik.values.sizes.includes(el.id)}
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
            {el.talle}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckOptions;
