import React from "react";
import { useStateProvider } from "../contexts/StateProvider";

const PlayListQueue = ({ icon, title, src, id }) => {
  const [{ playist_id }, dispatch] = useStateProvider();

  function changePlaylist() {
    dispatch({ type: "SET_PLAYLIST_ID", playlist_id: id });
  }

  return (
    <div
      className={`flex gap-5 p-1 rounded-sm  items-center text-white hover:cursor-pointer hover:bg-gray-300 hover:bg-opacity-30 max-sm:justify-center max-md:gap-0`}
      onClick={changePlaylist}
    >
      <div className="">
        {src ? <img className="max-w-[40px]" src={src}></img> : ""}
      </div>
      <div>
        <h2 className="text-md font-medium max-sm:hidden">{title}</h2>
      </div>
    </div>
  );
};

export default PlayListQueue;
