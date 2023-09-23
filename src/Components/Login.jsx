import React from "react";

const Login = () => {
  function handleClick() {
    const clientId = "4df78f71141e40ec84e9faad0273d945";
    const redirectURL = "http://localhost:5173/";
    const apiUrl = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-email",
      "user-read-private",
      "user-read-playback-state",
      "user-modify-playback-state",
      "user-read-currently-playing",
      "user-read-playback-position",
      "user-top-read",
      "user-read-recently-played",
    ];

    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectURL}&scope=${scope.join(
      " "
    )}&response_type=token&show_daialog=true`;
  }

  return (
    <div className=" bg-green-600 w-[100vw] h-[100vh] flex items-center justify-center">
      <div className="flex flex-col justify-center items-center gap-24">
        <img
          className="max-h-[20vh] mb-10"
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png"
        ></img>
        <button
          onClick={handleClick}
          className="text-2xl bg-black text-green-400 rounded-3xl px-10 py-2"
        >
          Connect Spotify
        </button>
      </div>
    </div>
  );
};

export default Login;
