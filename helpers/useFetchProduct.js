import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getProductData,
  getCategory,
  getGender,
  getSupplier,
} from "@/actions/productsActions";
import axios from "axios";

const useFetchProduct = (id, stock) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

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
          // Otras acciones del dispatch si otherVariable tiene otro valor
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, stock]); // Dependencias "id" y "otherVariable" para que el efecto se ejecute cuando cualquiera de ellas cambie

  return isLoading;
};

export default useFetchProduct;
