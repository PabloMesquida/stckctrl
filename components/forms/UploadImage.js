import { MdImage, MdOutlineFileUpload } from "react-icons/md";
import stylesGeneral from "@/styles/General.module.css";
import Message from "../messages/Message";

const UploadImage = ({
  formik,
  setImageSrc,
  imageSrc,
  uploadData,
  setUploadData,
}) => {
  async function handleOnSubmit(event) {
    event.preventDefault();

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

    formik.setFieldValue("imageSrc", "TEST");
    formik.setFieldValue("uploadData", "TEST");

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
    <>
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
        <div className={stylesGeneral.form_image_container}>
          <MdImage className={stylesGeneral.form_icon_image_placeholder} />
        </div>
      )}

      <div className="flex w-full ">
        {imageSrc && !uploadData && (
          <button onClick={handleOnSubmit} className={stylesGeneral.button_sm}>
            <MdOutlineFileUpload size={24} className="mr-4" /> Upload Files
          </button>
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
