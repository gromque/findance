// src/components/Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl text-purple-400 font-bold mb-4">{message}</h2>
        <button
          onClick={onClose}
          className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
