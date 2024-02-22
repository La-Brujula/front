export const ProgressBar = (props: { progress: number }) => {
  return (
    <div className="flex flex-row gap-6 items-center w-full max-w-xl justify-center">
      <div className="w-full border border-black-light rounded-md overflow-hidden h-8">
        <div
          className="bg-secondary bg-opacity-40 rounded-md h-full"
          style={{ width: `${props.progress}%` }}
        />
      </div>
      <p className="text-xl">{props.progress.toString().slice(0, 3)}%</p>
    </div>
  );
};
