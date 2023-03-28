import { useState } from "react";

export function CheckboxColorItem({
  formik,
  id,
  label,
  checkedIcon,
  uncheckedIcon,
}) {
  const [isChecked, setIsChecked] = useState(formik.values.colors.includes(id));
  const [isCheckedIcon, setIsCheckedIcon] = useState(false);
  //console.log("START", isChecked);

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
          console.log(newOptions);
          formik.setFieldValue("colors", newOptions);
          setIsCheckedIcon((prevState) => !prevState);
        }}
        className="sr-only"
      />
      {isCheckedIcon ? checkedIcon : uncheckedIcon}
      <span className="ml-2">{label}</span>
    </label>
  );
}
