import React from 'react';

export const Container = ({ children, bg }) => {
  return (
    <div
      className={[
        (() => {
          switch (bg) {
            case 'light':
              return 'bg-white';
            case 'primary':
              return 'bg-primary';
            case 'blue':
              return 'bg-secondary';
            case 'lightblue':
              return 'bg-primary bg-opacity-20';
            case 'whitetoblue':
              return 'bg-[linear-gradient(180deg,_#0000_80%,_#2d7bbf33_80%)]'
            default:
              return 'bg-transparent';
          }
        })(),
        'w-full',
        'px-4',
        'md:px-8',
        'py-8',
        'text-center',
        'flex',
        'flex-col',
        'justify-center',
      ].join(' ')}
    >
      <div className="max-w-6xl mx-auto w-full">{children}</div>
    </div>
  );
};
