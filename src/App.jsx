import { useEffect } from "react";
import Login from "./Components/Login";
import { useStateProvider } from "./contexts/StateProvider";
import Spotify from "./Components/Spotify";

function App() {
  const [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      dispatch({ type: "SET_TOKEN", token });
      window.location.hash = "";
    }
  }, [token, dispatch]);

  return <>{token ? <Spotify /> : <Login />}</>;
}

export default App;
