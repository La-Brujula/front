import React from "react";

export const Container = ({ children, bg }) => {
  return (
    <div
      className={[
        (() => {
          switch (bg) {
            case "light":
              return "bg-white";
            case "blue":
              return "bg-secondary";
            case "lightblue":
              return "bg-blue-light";
            default:
              return "bg-transparent";
          }
        })(),
        "w-full",
        "px-4",
        "py-8",
        "text-center",
        "flex",
        "flex-col",
        "justify-center",
      ].join(" ")}
    >
      <div className="max-w-6xl mx-auto w-full">{children}</div>
    </div>
  );
};
