import React from "react";
import {
  BsFillPauseCircleFill,
  BsFillPlayCircleFill,
  BsShuffle,
} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";
import { useStateProvider } from "../contexts/StateProvider";

const Controllers = () => {
  const [{ token, playerState }, dispatch] = useStateProvider();

  async function changeSong(state) {
    await fetch(`https://api.spotify.com/v1/me/player/${state}`, {
      method: "post",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
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
    } else {
      dispatch({ type: "SET_CURRENT_PLAYING", currentlyPlayingTrack: null });
    }
  }

  async function changeState() {
    const state = playerState ? "pause" : "play";
    await fetch(`https://api.spotify.com/v1/me/player/${state}`, {
      method: "put",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: "SET_PLAYER_STATE", playerState: !playerState });
  }

  async function ToggleShuffle() {
    await fetch(`https://api.spotify.com/v1/me/player/shuffle`, {
      method: "put",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
  }
  async function setRepeat() {
    await fetch(`https://api.spotify.com/v1/me/player/repeat`, {
      method: "put",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <div className=" flex justify-center items-center h-full gap-5 max-md:gap-1">
      <BsShuffle
        className="max-sm:hidden"
        onClick={ToggleShuffle}
        size={"15px"}
        color="white"
      />
      <CgPlayTrackPrev
        onClick={() => changeSong("previous")}
        size={"30px"}
        color="white"
      />
      {playerState ? (
        <BsFillPauseCircleFill
          size={"30px"}
          color="white"
          onClick={changeState}
        />
      ) : (
        <BsFillPlayCircleFill
          size={"30px"}
          color="white"
          onClick={changeState}
        />
      )}

      <CgPlayTrackNext
        onClick={() => changeSong("next")}
        size={"30px"}
        color="white"
      />
      <FiRepeat
        className="max-sm:hidden"
        onClick={setRepeat}
        size={"15px"}
        color="green"
      />
    </div>
  );
};

export default Controllers;
