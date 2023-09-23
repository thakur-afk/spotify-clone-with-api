import React, { useEffect } from "react";
import SideOptions from "./SideOptions";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { IoLibrary } from "react-icons/io5";
import { useStateProvider } from "../contexts/StateProvider";
import { Axios } from "axios";
import PlayListQueue from "./PlayListQueue";

const SideBar = () => {
  const [{ playlist, token }, dispatch] = useStateProvider();

  useEffect(() => {
    async function getplaylist() {
      let _playlist = await fetch("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      const { items } = _playlist;
      const playlistItem = items.map(({ name, id, images }) => {
        return {
          name,
          id,
          images,
        };
      });

      if (_playlist) {
        dispatch({ type: "SET_PLAYLIST", playlist: playlistItem });
      }
    }
    getplaylist();
  }, [token, dispatch]);

  function changePlaylist() {}

  return (
    <div className=" bg-black h-[90vh] px-5 opacity-80 flex flex-col gap-3 py-5 max-sm:px-1 max-sm:py-1">
      <div className="flex justify-center">
        <img
          className="max-w-[140px] max-sm:hidden"
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
        ></img>
      </div>
      <div className="flex flex-col gap-2 py-3 max-sm:items-center">
        <SideOptions icon={<AiFillHome size={"20px"} />} title={"Home"} />
        <SideOptions
          icon={<AiOutlineSearch size={"20px"} />}
          title={"Search"}
        />
        <SideOptions icon={<IoLibrary size={"20px"} />} title={"Library"} />
      </div>
      <h2 className="text-xl text-white max-sm:hidden">Playlist</h2>
      <hr className=""></hr>
      <div className="flex flex-col gap-5 py-5 overflow-hidden overflow-y-scroll scrollbar-hide">
        {/* {console.log(playlist[0].images[0].url)} */}
        {playlist
          ? playlist.map((item, id) => {
              return (
                <PlayListQueue
                  key={id}
                  src={item.images[0]?.url}
                  title={item.name}
                  id={item.id}
                />
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default SideBar;
