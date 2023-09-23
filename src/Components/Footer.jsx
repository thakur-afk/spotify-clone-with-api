import React from "react";
import CurrentTrack from "./CurrentTrack";
import Controllers from "./Controllers";
import Volume from "./Volume";

const Footer = () => {
  return (
    <div className="bg-[#181818] h-[10vh] z-10 grid grid-cols-4 place-items-center ">
      <CurrentTrack />
      <div className="  col-span-2 ">
        <Controllers />
      </div>
      <div className="flex justify-end pr-5 items-center max-md:pr-0">
        <Volume />
      </div>
    </div>
  );
};

export default Footer;
