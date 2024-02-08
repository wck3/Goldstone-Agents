// Popup.js

import React from 'react';
import './image_upload.css';

const ImageUpload = ({ isOpen, onClose, children}) => {
  if (!isOpen) {
    return null;
  }


  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close-btn" onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default ImageUpload;
