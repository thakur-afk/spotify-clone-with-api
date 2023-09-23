import React from "react";
import { useStateProvider } from "../contexts/StateProvider";

const SongQueue = ({ item, id }) => {
  const [{ token, currentlyPlayingTrack, playerState }, dispatch] =
    useStateProvider();

  function changetomins(ms) {
    const mins = Math.floor(ms / 60000);
    const secs = ((ms % 60000) / 1000).toFixed(0);

    return mins + ":" + (secs < 10 ? "0" : "") + secs;
  }

  async function playTrack(
    id,
    name,
    artists,
    image,
    context_uri,
    track_number
  ) {
    const response = await fetch(`https://api.spotify.com/v1/me/player/play`, {
      method: "put",
      body: JSON.stringify({
        context_uri,
        offset: {
          position: track_number - 1,
        },
        position_ms: 0,
      }),
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 204) {
      const currentlyPlayingTrack = {
        id: id,
        name: name,
        artists: artists,
        image: image,
      };

      dispatch({
        type: "SET_CURRENT_PLAYING",
        currentlyPlayingTrack: currentlyPlayingTrack,
      });
      dispatch({ type: "SET_PLAYER_STATE", playerState: true });
    } else {
      dispatch({ type: "SET_PLAYER_STATE", playerState: true });
    }
  }

  return (
    <div
      className="flex gap-10 text-white items-center hover:bg-black hover:bg-opacity-30 hover:cursor-pointer max-md:gap-2 max-md:text-xs"
      onClick={() =>
        playTrack(
          item.id,
          item.name,
          item.artists,
          item.image,
          item.context_uri,
          item.track_number
        )
      }
    >
      <div className="flex-[5] text-center ">
        <h1>{id}</h1>
      </div>
      <div className="flex-[5] flex items-center">
        <img className="max-w-[50px]" src={item.image}></img>
      </div>
      <div className="flex-[50]">
        <h1>{item.name.split("(")[0]}</h1>
        <h1 className="">{item.artists.join(", ")}</h1>
      </div>
      <div className="flex-[30] max-sm:hidden">
        <h1>{item.album.split("(")[0]}</h1>
      </div>
      <div className="flex-[10]">
        <h1>{changetomins(item.duration)}</h1>
      </div>
    </div>
  );
};

export default SongQueue;
