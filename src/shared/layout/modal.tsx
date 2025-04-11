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
          className="absolute left-0 top-0 h-screen w-full"
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
