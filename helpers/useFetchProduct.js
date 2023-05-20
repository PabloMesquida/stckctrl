import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getProductData,
  getCategory,
  getGender,
  getSupplier,
} from "@/actions/productsActions.js";
import { updateSaleData } from "@/actions/salesAction.js";
import axios from "axios";

const useFetchProduct = (id, stock) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  console.log("USE");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await axios.get(`./../../api/stock/${id}`);
        const productData = productRes.data;

        const [
          { data: categoryData },
          { data: genderData },
          { data: supplierData },
        ] = await axios.all([
          axios.get(
            `./../../api/attributes/categoria/${productData[0].id_cat}`
          ),
          axios.get(`./../../api/attributes/genero/${productData[0].id_gen}`),
          axios.get(
            `./../../api/attributes/proveedores/${productData[0].id_prov}`
          ),
        ]);

        if (stock) {
          dispatch(getProductData(productData));
          dispatch(getCategory(categoryData));
          dispatch(getGender(genderData));
          dispatch(getSupplier(supplierData));
        } else {
          console.log("OK");
          dispatch(updateSaleData(productData));
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, stock]);

  return isLoading;
};

export default useFetchProduct;
