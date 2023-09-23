import React, { useEffect } from "react";
import SideBar from "./SideBar";
import Body from "./Body";
import Footer from "./Footer";

const Spotify = () => {
  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-b from-[rgb(32,87,100)] to-black">
      <div className="flex">
        <div className="flex-[15] max-sm:flex-[5]">
          <SideBar />
        </div>
        <div className="flex-[85] max-sm:flex-[95]">
          <Body />
        </div>
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default Spotify;
