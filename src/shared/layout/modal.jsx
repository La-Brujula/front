import React, { useState } from "react";
import ReactDOM from 'react-dom/client'

export const Modal = ({ children, defaultState }) => {
  const [isOpen, setIsOpen] = useState(defaultState && true);
  return isOpen ? (
    ReactDOM.createPortal(
      <div>
        <div
          className="absolute top-0 left-0 w-full h-screen"
          onClick={() => setIsOpen(false)}
        ></div>
        {children}
      </div>,
      document.getElementById("modal")
    )
  ) : (
    <></>
  );
};
