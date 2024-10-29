import React from "react";

interface ITooltip {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<ITooltip> = ({ children, text }) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-highest text-low text-xs rounded py-1 px-2">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
