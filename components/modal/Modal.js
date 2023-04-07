import stylesGeneral from "@/styles/General.module.css";
import IconAlert from "../icons/IconAlert.js";
import { Waveform } from "@uiball/loaders";

const Modal = ({ message, closemodal }) => {
  const text = !message.text ? "Cargando..." : message.text;
  console.log("mensaje", message.text);

  return (
    <div
      id="popup-modal"
      className="fixed top-0 left-0 w-full h-screen z-100  backdrop-blur-2xl flex justify-center items-center "
    >
      <div className="relative w-full sm:w-2/5 p-4 ">
        <div className="relative bg-th-background-tertiary rounded-md shadow-lg shadow-black/50">
          <div className="p-6 text-center">
            <div className="flex justify-center m-4">
              {message.text ? (
                <IconAlert message={message} size={42} />
              ) : (
                <Waveform size={38} lineWeight={3.5} speed={1} color="white" />
              )}
            </div>
            <h3 className="my-8 text-lg font-normal text-th-primary-dark">
              {text}
            </h3>
            {message.text && (
              <button
                data-modal-hide="popup-modal"
                type="button"
                className={stylesGeneral.button}
                onClick={closemodal}
              >
                Continuar
              </button>
            )}

            {/* <button
              data-modal-hide="popup-modal"
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, cancel
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
