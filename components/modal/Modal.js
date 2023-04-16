import stylesGeneral from "@/styles/General.module.css";
import IconAlert from "../icons/IconAlert.js";
import { Waveform } from "@uiball/loaders";

const Modal = ({ message, firstBtn, secondBtn = null }) => {
  const text = !message.text ? "Cargando..." : message.text;

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
                className={stylesGeneral.button_sm}
                onClick={firstBtn}
              >
                Continuar
              </button>
            )}
            {secondBtn && (
              <button
                data-modal-hide="popup-modal"
                type="button"
                className={stylesGeneral.button_sm_nofill}
                onClick={secondBtn}
              >
                No, cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
