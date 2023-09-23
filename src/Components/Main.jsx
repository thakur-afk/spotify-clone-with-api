import React, { useEffect } from "react";
import { useStateProvider } from "../contexts/StateProvider";
import SongQueue from "./SongQueue";

const Main = () => {
  const [{ token, INITIAL_PLAYIST, playlist_id }, dispatch] =
    useStateProvider();

  useEffect(() => {
    async function getInitialPlaylist() {
      let response = await fetch(
        `https://api.spotify.com/v1/playlists/${playlist_id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json());
      //   console.log(response);

      const getInitialPlaylistDetails = {
        name: response.name,
        id: response.id,
        description: response.description?.startsWith("<a")
          ? ""
          : response.description,
        image: response.images[0].url,
        tracks: response.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      };
      //   console.log(getInitialPlaylistDetails);
      dispatch({
        type: "SET_INITIAL_PLAYIST",
        INITIAL_PLAYIST: getInitialPlaylistDetails,
      });
    }

    getInitialPlaylist();
  }, [token, dispatch, playlist_id]);

  return (
    <div>
      {INITIAL_PLAYIST ? (
        <div>
          <div className="px-10 py-5 flex gap-3 items-center max-md:p-2">
            <div className="max-w-[150px] max-sm:w-[100px]">
              <img src={INITIAL_PLAYIST.image}></img>
            </div>
            <div className="flex flex-col gap-5">
              <h2 className="text-xl text-black font-semibold max-md:hidden">
                Playlist
              </h2>
              <h1 className="text-4xl text-white font-semibold max-sm:text-lg">
                {INITIAL_PLAYIST.name}
              </h1>
              <h2 className="text-lg font-medium max-md:hidden">
                {INITIAL_PLAYIST.description}
              </h2>
            </div>
          </div>
          {/* overflow-hidden overflow-y-scroll h-[40vh] scrollbar-hide */}
          <div className="flex gap-10 text-white text-lg justify-start mb-4 font-semibold max-sm:gap-2 max-sm:text-sm">
            <div className="flex-[5] text-center">
              <h1>#</h1>
            </div>
            <div className="flex-[58] ">
              <h1>TITLE</h1>
            </div>
            <div className="flex-[30] max-sm:hidden">
              <h1>ALBUM</h1>
            </div>
            <div className="flex-[10]">
              <h1>TIME</h1>
            </div>
          </div>
          <div className="flex flex-col gap-5 overflow-hidden overflow-y-scroll h-[40vh] scrollbar-hide max-sm:h-[50vh]">
            {INITIAL_PLAYIST.tracks.map((track, i) => {
              return <SongQueue item={track} key={i} id={i + 1} />;
            })}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Main;
