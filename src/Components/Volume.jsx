import React from "react";
import { useStateProvider } from "../contexts/StateProvider";
import { HiOutlineSpeakerWave } from "react-icons/hi2";

const Volume = () => {
  const [{ token }, dispatch] = useStateProvider();

  async function setPlaybackVolume(val) {
    await fetch(
      `https://api.spotify.com/v1/me/player/volume?volume_percent=${val}`,
      {
        method: "put",
        // body: JSON.stringify({ volume_percent: parseInt(val) }),
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
  }
  return (
    <div className="flex gap-2">
      <HiOutlineSpeakerWave
        color="white"
        size={"20px"}
        className=" max-sm:hidden"
      />
      <input
        className="max-md:w-[50px]"
        onChange={(e) => {
          setPlaybackVolume(parseInt(e.target.value));
        }}
        type="range"
        min={0}
        max={100}
      ></input>
    </div>
  );
};

export default Volume;
