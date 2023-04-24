import { useState } from "react";
import useUncheckedIcon from "@/helpers/useUncheckedIcon.js";
import useCheckedIcon from "@/helpers/useCheckedIcon.js";

export function CheckboxColorItem({ formik, id, label, hex, size }) {
  const [isCheckedIcon, setIsCheckedIcon] = useState(
    formik.values.colors.includes(id)
  );
  const getIconUnChecked = useUncheckedIcon(id, hex, size);
  const getIconChecked = useCheckedIcon(id, hex);

  return (
    <label htmlFor={"checkbox" + id} className="flex items-center">
      <input
        key={id}
        type="checkbox"
        id={"checkbox" + id}
        checked={formik.values.colors.includes(id)}
        onChange={(event) => {
          const isChecked = event.target.checked;
          let newOptions = formik.values.colors;
          if (isChecked) {
            newOptions.push(id);
          } else {
            newOptions = newOptions.filter((option) => option !== id);
          }
          formik.setFieldValue("colors", newOptions);
          setIsCheckedIcon((prevState) => !prevState);
        }}
        className="sr-only"
      />
      {isCheckedIcon ? getIconChecked() : getIconUnChecked()}
      <span className="ml-2">{label}</span>
    </label>
  );
}
