// BreakpointTest.tsx
import React from "react";

const BreakpointTest: React.FC = () => {
  return (
    <div
      className="
        h-[12rem] rounded-xl text-white font-semibold flex items-center justify-center
        /* color base (xs: <640px) */
        bg-gray-500
        /* sm ≥640px */
        sm:bg-red-500
        /* md ≥768px */
        md:bg-orange-500
        /* lg ≥1024px */
        lg:bg-yellow-500 lg:text-black
        /* xl ≥1280px */
        xl:bg-green-500 xl:text-white
        /* 2xl ≥1536px */
        2xl:bg-blue-600
      "
    >
      {/* Etiquetas visibles SOLO en su rango */}
      <span className="block sm:hidden">BASE &lt; 640px</span>
      <span className="hidden sm:block md:hidden">SM ≥ 640px</span>
      <span className="hidden md:block lg:hidden">MD ≥ 768px</span>
      <span className="hidden lg:block xl:hidden">LG ≥ 1024px</span>
      <span className="hidden xl:block 2xl:hidden">XL ≥ 1280px</span>
      <span className="hidden 2xl:block">2XL ≥ 1536px</span>
    </div>
  );
};

export default BreakpointTest;
