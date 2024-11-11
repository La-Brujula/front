import { ReactNode } from 'react';

export const Button = (
  props: {
    color: 'primary' | 'secondary';
    variant: 'outline' | 'filled';
    children: ReactNode;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { color, variant, children } = props;
  switch (variant) {
    case 'outline':
      return (
        <button
          {...props}
          className={[
            'text-black px-12 py-4 rounded-md outline bg-transparent',
            props.className,
            (() => {
              switch (color) {
                case 'primary':
                  return 'outline-primary';
                case 'secondary':
                  return 'outline-secondary';
              }
            })(),
          ].join(' ')}
        >
          {children}
        </button>
      );
    case 'filled':
      return (
        <button
          {...props}
          className={[
            'text-white px-12 py-4 rounded-md',
            props.className,
            (() => {
              switch (color) {
                case 'primary':
                  return 'bg-primary';
                case 'secondary':
                  return 'bg-secondary';
              }
            })(),
          ].join(' ')}
        >
          {children}
        </button>
      );
  }
};
