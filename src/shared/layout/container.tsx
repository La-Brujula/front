import { ReactNode } from 'react';

export const Container = (props: {
  children: ReactNode | ReactNode[];
  bg?:
    | 'light'
    | 'primary'
    | 'blue'
    | 'lightblue'
    | 'top-half-blue'
    | 'bottom-half-blue'
    | 'bottom-half-grey'
    | 'whitetoblue';
  className?: string;
}) => {
  const { children, bg, className } = props;
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
            case 'top-half-blue':
              return 'bg-[linear-gradient(180deg,_rgba(255_255_255_0)_80%,_rgba(45_123_191_255)_80%)]';
            case 'bottom-half-grey':
              return 'bg-[linear-gradient(180deg,_#ededed00_60%,_#edededff_60%)]';
            case 'whitetoblue':
              return 'bg-[linear-gradient(180deg,_#0000_80%,_#2d7bbf33_80%)]';
            default:
              return 'bg-transparent';
          }
        })(),
        'w-full',
        'max-w-[100vw]',
        'px-4',
        'md:px-8',
        'py-8',
        'text-center',
        'flex',
        'flex-col',
        'justify-center',
        className,
      ].join(' ')}
    >
      <div className="max-w-6xl mx-auto w-full">{children}</div>
    </div>
  );
};
