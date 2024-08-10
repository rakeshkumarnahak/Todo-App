import React from "react";

const Modal = ({ open, onClose, children }) => {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/20" : "invisible"
      }`}
      onClick={onClose}
    >
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        className={`bg-white shadow transition-all rounded-sm sm:mx-auto sm:w-full sm:max-w-sm ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
