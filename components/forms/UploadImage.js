import { useState, useMemo } from "react";
import Message from "../messages/Message.js";
import { MdImage, MdOutlineFileUpload, MdRefresh } from "react-icons/md";
import { Ring } from "@uiball/loaders";
import stylesGeneral from "@/styles/General.module.css";

const UploadImage = ({
  isChange,
  setIsChange,
  setImageSrc,
  imageSrc,
  uploadData,
  setUploadData,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  async function handleOnSubmit(event) {
    event.preventDefault();

    const inputs = document.getElementsByTagName("input");
    const fileInput = Array.from(inputs).find((input) => input.name === "file");

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "stckctrl-uploads");

    setIsUploading(true);

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dq2hljnad/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    setImageSrc(data.secure_url);
    setUploadData(data);
    setIsUploading(false);
  }

  function handleOnChange(changeEvent) {
    setIsChange(true);
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);

      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  const shouldShowButton = useMemo(() => {
    return imageSrc && !uploadData && !isUploading && isChange;
  }, [imageSrc, uploadData, isUploading, isChange]);

  const shouldShowUploadingIcon = useMemo(() => {
    return imageSrc && !uploadData && isUploading;
  }, [imageSrc, uploadData, isUploading]);

  return (
    <>
      <p>
        <input
          type="file"
          name="file"
          onChange={handleOnChange}
          className={stylesGeneral.button_upload}
        />
      </p>

      {imageSrc !== "No Image" ? (
        <div className={`${stylesGeneral.form_image_container} p-2 sm:p-4 `}>
          <img className="rounded-md max-h-96" src={imageSrc} />
        </div>
      ) : (
        <div className={stylesGeneral.form_image_container}>
          <MdImage className={stylesGeneral.form_icon_image_placeholder} />
        </div>
      )}

      <div className="flex w-full">
        {shouldShowButton && (
          <button onClick={handleOnSubmit} className={stylesGeneral.button_sm}>
            <MdOutlineFileUpload size={24} className="mr-4" />
            Upload Files
          </button>
        )}
        {shouldShowUploadingIcon && (
          <div
            className={`${stylesGeneral.button_sm} flex justify-center items-center`}
          >
            <Ring size={28} lineWeight={3.5} speed={1} color="white" />
          </div>
        )}
        {imageSrc && uploadData && (
          <Message
            message={{
              type: "success",
              text: "La imagen se ha cargado correctamente.",
            }}
          />
        )}
      </div>
    </>
  );
};

export default UploadImage;
