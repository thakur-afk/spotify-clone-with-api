import React from "react";
import { useStateProvider } from "../contexts/StateProvider";

const SideOptions = ({ icon, title }) => {
  return (
    <div
      className={`flex gap-5  items-center text-white  opacity-50
       hover:opacity-100 hover:cursor-pointer max-sm:gap-0`}
    >
      <div className=" ">{icon}</div>
      <div>
        <h2 className="text-lg font-bold max-sm:hidden">{title}</h2>
      </div>
    </div>
  );
};

export default SideOptions;
