export const initialState = {
  token: null,
  playlist: null,
  user: null,
  INITIAL_PLAYIST: null,
  currentlyPlayingTrack: null,
  playlist_id: "3vaFOIAhoVXb1nnw0uhylC",
  playerState: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TOKEN": {
      return {
        ...state,
        token: action.token,
      };
    }

    case "SET_PLAYLIST": {
      return {
        ...state,
        playlist: action.playlist,
      };
    }
    case "SET_USER": {
      return {
        ...state,
        user: action.user,
      };
    }
    case "SET_INITIAL_PLAYIST": {
      return {
        ...state,
        INITIAL_PLAYIST: action.INITIAL_PLAYIST,
      };
    }
    case "SET_CURRENT_PLAYING": {
      return {
        ...state,
        currentlyPlayingTrack: action.currentlyPlayingTrack,
      };
    }
    case "SET_PLAYLIST_ID": {
      return {
        ...state,
        playlist_id: action.playlist_id,
      };
    }
    case "SET_PLAYER_STATE": {
      return {
        ...state,
        playerState: action.playerState,
      };
    }

    default:
      state;
  }
};
