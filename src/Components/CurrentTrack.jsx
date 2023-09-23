import React, { useEffect } from "react";
import { useStateProvider } from "../contexts/StateProvider";

const CurrentTrack = () => {
  const [{ token, currentlyPlayingTrack, playerState }, dispatch] =
    useStateProvider();

  useEffect(() => {
    async function getCurrentTrack() {
      let response = await fetch(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json());
      // console.log(response);
      if (response !== "") {
        const { item } = response;
        const currentPlaying = {
          id: item.id,
          name: item.name,
          artists: item.artists.map((artist) => artist.name),
          image: item.album.images[2].url,
        };

        dispatch({
          type: "SET_CURRENT_PLAYING",
          currentlyPlayingTrack: currentPlaying,
        });
      }
    }
    getCurrentTrack();
  }, [token, dispatch, playerState, currentlyPlayingTrack]);

  return (
    <div>
      {currentlyPlayingTrack && (
        <div className="flex text-white gap-2 items-center px-5 place-items-center max-sm:gap-0">
          <div className="max-w-[50px] max-sm:hidden">
            <img src={currentlyPlayingTrack.image}></img>
          </div>
          <div>
            <h2 className="max-sm:text-[10px]">
              {currentlyPlayingTrack.name.split("(")[0]}
            </h2>
            <h2 className="max-md:hidden">
              {currentlyPlayingTrack.artists.join(", ")}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentTrack;
