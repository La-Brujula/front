export const ProgressBar = ({ progress }) => {
  return (
    <div className="flex flex-row gap-6 items-center">
      <div className="w-full border border-black-light rounded-md overflow-hidden h-8">
        <div
          className="bg-primary bg-opacity-20 rounded-md h-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xl">{progress.toString().slice(0, 3)}%</p>
    </div>
  );
};
