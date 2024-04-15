import { ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';

export const Modal = (props: {
  children: ReactNode;
  defaultState: boolean;
}) => {
  const { children, defaultState } = props;
  const [isOpen, setIsOpen] = useState(defaultState && true);
  return isOpen ? (
    createPortal(
      <div>
        <div
          className="absolute top-0 left-0 w-full h-screen"
          onClick={() => setIsOpen(false)}
        ></div>
        {children}
      </div>,
      document.getElementById('modal') as HTMLElement
    )
  ) : (
    <></>
  );
};
