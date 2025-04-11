export const ProgressBar = (props: { progress: number }) => {
  return (
    <div className="flex w-full max-w-xl flex-row items-center justify-center gap-6">
      <div className="border-black-light h-8 w-full overflow-hidden rounded-md border">
        <div
          className="h-full rounded-md bg-secondary bg-opacity-40"
          style={{ width: `${props.progress}%` }}
        />
      </div>
      <p className="text-xl">{props.progress.toString().slice(0, 3)}%</p>
    </div>
  );
};
