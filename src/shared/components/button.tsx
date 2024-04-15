import { ReactNode } from 'react';

export const Button = (
  props: {
    color: string;
    variant: 'outline' | 'filled';
    children: ReactNode;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { color, variant, children } = props;
  switch (variant) {
    case 'outline':
      return (
        <button
          className={[
            'text-black px-12 py-4 rounded-md',
            'outline',
            'bg-transparent',
            (() => {
              switch (color) {
                case 'primary':
                  return 'outline-primary';
                case 'secondary':
                  return 'outline-secondary';
              }
            })(),
          ].join(' ')}
          {...props}
        >
          {children}
        </button>
      );
    case 'filled':
      return (
        <button
          className={[
            'text-white px-12 py-4 rounded-md',
            (() => {
              switch (color) {
                case 'primary':
                  return 'bg-primary';
                case 'secondary':
                  return 'bg-secondary';
              }
            })(),
          ].join(' ')}
          {...props}
        >
          {children}
        </button>
      );
  }
};
