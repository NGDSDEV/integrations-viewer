"use client";

import { Search } from "lucide-react";
import { useAppSelector } from "@/lib/hooks";

export default function Spinner() {
  const stateSpinner = useAppSelector((state) => state.general.showSpinner);

  return (
    <>
      {stateSpinner && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-20">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Search className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
