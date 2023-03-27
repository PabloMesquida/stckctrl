import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getColors } from "@/actions/productsActions.js";
import axios from "axios";
import { MdCircle } from "react-icons/md";

const CheckColors = ({ formik }) => {
  const colors = useSelector((state) => state?.products.colors);
  const dispatch = useDispatch();

  const fetchColors = useCallback(async () => {
    try {
      const res = await axios.get(`../../api/attributes/colores`);

      dispatch(getColors(res.data));
    } catch (error) {
      if (error.response?.status === 404) {
        console.log("ERROR");
      } else {
        console.log("OTRO ERROR", error);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    fetchColors();
  }, [fetchColors]);

  return (
    <div>
      {colors.map((el) => (
        <div key={el.id}>
          <label>
            <input
              className="rounded-full"
              name="idColor"
              type="checkbox"
              value={el.id}
              checked={formik.values.colors.includes(el.id)}
              onChange={(event) => {
                const isChecked = event.target.checked;
                let newOptions = formik.values.colors;
                if (isChecked) {
                  newOptions.push(el.id);
                } else {
                  newOptions = newOptions.filter((option) => option !== el.id);
                }
                formik.setFieldValue("colors", newOptions);
              }}
            />
            <MdCircle
              style={{ color: el.hex }}
              className="h-6 w-6"
              onChange={(event) => {
                const isChecked = event.target.checked;
                let newOptions = formik.values.colors;
                if (isChecked) {
                  newOptions.push(el.id);
                } else {
                  newOptions = newOptions.filter((option) => option !== el.id);
                }
                formik.setFieldValue("colors", newOptions);
              }}
            />
            {el.color}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckColors;
