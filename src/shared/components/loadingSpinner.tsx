export const LoadingSpinner = () => {
  return (
    <div
      className="mx-auto size-16 animate-spin rounded-full border-4 border-primary !p-8"
      style={{
        clipPath:
          'polygon(50% 0%, 50% 50%, 0% 50%, 0% 100%, 100% 100%, 100% 0%',
      }}
    />
  );
};
