import CloseIcon from "./CloseIcon";
import ImageCropper from "./ImageCropper";

const Modal = ({ updateAvatar, closeModal }) => {
  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-75 backdrop-blur-sm"
      aria-labelledby="crop-image-dialog"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-[95%] sm:w-[50%] max-h-[80vh] min-h-[60vh] rounded-2xl bg-gray-800 text-slate-100 text-left shadow-xl transition-all flex flex-col items-center">
        <button
          type="button"
          className="absolute top-2 right-2 rounded-md p-1 inline-flex items-center justify-center text-gray-400 hover:bg-gray-700 focus:outline-none"
          onClick={closeModal}
        >
          <span className="sr-only">Close menu</span>
          <CloseIcon />
        </button>
        <div className="px-5 py-4 w-full flex flex-col items-center overflow-auto">
          <ImageCropper updateAvatar={updateAvatar} closeModal={closeModal} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
