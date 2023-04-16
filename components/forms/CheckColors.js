import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getColors } from "@/actions/productsActions.js";
import IconMulticolor from "@/components/icons/IconMulticolor.js";
import axios from "axios";
import { CheckboxColorItem } from "./CheckboxColorItem";

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
    <div className="flex gap-4 flex-wrap">
      {colors?.map((el) => (
        <div key={el.id} className="w-36">
          <IconMulticolor />
          {el.id === 26}
          <CheckboxColorItem
            formik={formik}
            id={el.id}
            label={el.color}
            hex={el.hex}
            size={26}
          />
        </div>
      ))}
    </div>
  );
};

export default CheckColors;
