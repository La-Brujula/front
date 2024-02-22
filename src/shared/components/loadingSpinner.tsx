export const LoadingSpinner = () => {
  return (
    <div
      className="mx-auto rounded-full size-16 border-4 border-primary animate-spin"
      style={{
        clipPath:
          'polygon(50% 0%, 50% 50%, 0% 50%, 0% 100%, 100% 100%, 100% 0%',
      }}
    />
  );
};
