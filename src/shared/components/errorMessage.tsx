import React from 'react';

export function ErrorMessage(props: { message: string }) {
  return (
    <div className="bg-amber-300 p-8 rounded-md text-[#303030] font-bold w-full max-w-[100vw]">
      <p className="w-full">{props.message}</p>
    </div>
  );
}

export default React.memo(ErrorMessage);
