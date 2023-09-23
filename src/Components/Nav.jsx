import React, { useEffect } from "react";
import { RxAvatar } from "react-icons/rx";
import { LuSearch } from "react-icons/lu";
import { useStateProvider } from "../contexts/StateProvider";

const Nav = () => {
  const [{ token, user }, dispatch] = useStateProvider();

  useEffect(() => {
    async function getUserDetail() {
      let _user = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      const userDetails = {
        name: _user.display_name,
        id: _user.id,
        images: _user.images,
      };

      if (_user) {
        dispatch({ type: "SET_USER", user: userDetails });
      }
    }
    getUserDetail();
  }, [token, dispatch]);

  return (
    <div className="flex justify-between">
      <div className="flex bg-white rounded-3xl px-2 items-center w-fit h-[35px]">
        <LuSearch size={"20px"} />{" "}
        <input
          className=" focus:outline-none px-2 w-72 max-md:w-[100px] max-sm:hidden"
          placeholder="Search Song, Artist , Album and Podcasts"
        ></input>
      </div>
      <div className="flex items-center gap-3 bg-[#1d1d1d] rounded-3xl px-1 py-[4px]">
        {user?.images[0].url ? (
          <img
            className="rounded-[70%] h-[40px] w-[40px] max-md:w-[20px] max-md:h-[20px]"
            src={user.images[0].url}
          ></img>
        ) : (
          <RxAvatar size={"50px"} color="white" />
        )}
        <h2 className="text-lg font-semibold text-white pr-2 max-md:text-sm">
          {user?.name ? `${user.name}` : "Guest"}
        </h2>
      </div>
    </div>
  );
};

export default Nav;
