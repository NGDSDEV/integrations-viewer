"use client";

import Icon from "./Icon";
import Button from "./Button";
import { icons } from "lucide-react";
import { Inter } from "next/font/google";
import { TToast } from "@/types/toastStatus";
import { hideToast } from "@/lib/features/common/toast";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";

const inter700 = Inter({ weight: "700", subsets: ["latin"] });
const inter400 = Inter({ weight: "400", subsets: ["latin"] });

const Toast: React.FC = () => {
  const dispatch = useAppDispatch();
  const { type, title, description, visible, time } = useAppSelector((state) => state.toast);

  const backgroundColors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  };

  const iconState = (type: TToast): keyof typeof icons => {
    const status: Record<TToast, keyof typeof icons> = {
      success: "CircleCheckBig",
      error: "OctagonX",
      info: "CircleAlert",
      warning: "TriangleAlert",
    };

    return status[type];
  };

  if (!visible) return null;

  setTimeout(() => {
    dispatch(hideToast());
  }, time);

  return (
    <div className={`fixed z-20 bottom-4 right-4 max-w-sm w-full p-4 rounded-lg shadow-lg text-white ${backgroundColors[type]} toast-slide-up`}>
      <div className="flex">
        <div className="flex-1 flex-col">
          <div className="flex gap-2 items-center">
            <Icon name={iconState(type)} size={20} />
            <h4 className={`${inter700.className} antialiased`}>{title}</h4>
          </div>
          <div>
            <p className={`${inter400.className} antialiased`}>{description}</p>
          </div>
        </div>
        <Button addIcon="X" onClick={() => dispatch(hideToast())} />
      </div>
    </div>
  );
};

export default Toast;
