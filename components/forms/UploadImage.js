import { useState } from "react";
import { MdImage, MdOutlineFileUpload } from "react-icons/md";
import stylesGeneral from "@/styles/General.module.css";

const UploadImage = ({ setImageSrc, imageSrc }) => {
  const [uploadData, setUploadData] = useState();
  async function handleOnSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    console.log(form.elements);

    const inputs = document.getElementsByTagName("input");
    const fileInput = Array.from(inputs).find((input) => input.name === "file");

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "stckctrl-uploads");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dq2hljnad/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    setImageSrc(data.secure_url);
    setUploadData(data);
  }

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }
  return (
    <div className="flex flex-col gap-4 h-full">
      <div>Imágen:</div>
      <p>
        <input
          type="file"
          name="file"
          onChange={handleOnChange}
          className={stylesGeneral.button_upload}
        />
      </p>
      {imageSrc ? (
        <img src={imageSrc} />
      ) : (
        <div className="bg-th-background rounded-md flex justify-center items-center h-full">
          <MdImage className="w-32 h-32 sm:w-40 sm:h-40 text-th-background-tertiary" />
        </div>
      )}

      {imageSrc && !uploadData && (
        <div className="flex w-full ">
          <button onClick={handleOnSubmit} className={stylesGeneral.button_sm}>
            <MdOutlineFileUpload size={24} className="mr-4" /> Upload Files
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
