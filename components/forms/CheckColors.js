import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getColors } from "@/actions/productsActions.js";
import axios from "axios";
import { MdCircle, MdModeStandby } from "react-icons/md";
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
    <div>
      {colors.map((el) => (
        <div key={el.id}>
          <CheckboxColorItem
            formik={formik}
            id={el.id}
            label={el.color}
            uncheckedIcon={<MdCircle style={{ color: el.hex }} />}
            checkedIcon={<MdModeStandby style={{ color: el.hex }} />}
          />
        </div>
      ))}
    </div>
  );
};

export default CheckColors;
