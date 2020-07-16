import {
  ADD_GAME,
  DELETE_GAME,
  GAME_ERROR,
  GET_GAMES,
  GET_GAME,
  UPDATE_GAME_LIKES,
  UPDATE_GAME_OWNERS,
  GET_OWNED_GAMES,
} from '../actions/types';

const initialState = {
  games: [],
  game: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_OWNED_GAMES:
    case GET_GAMES:
      return {
        ...state,
        games: payload,
        loading: false,
      };
    case GET_GAME:
      return {
        ...state,
        game: payload,
        loading: false,
      };
    case DELETE_GAME:
      return {
        ...state,
        games: state.games.filter((game) => game._id !== game),
        loading: false,
      };
    case ADD_GAME:
      return {
        ...state,
        games: [payload, ...state.games],
        loading: false,
      };
    case UPDATE_GAME_LIKES:
      return {
        ...state,
        games: state.games.map((game) =>
          game._id === payload.gameId ? { ...game, likes: payload.likes } : game
        ),
        loading: false,
      };
    case UPDATE_GAME_OWNERS:
      return {
        ...state,
        games: state.games.map((game) =>
          game._id === payload.gameId
            ? { ...game, owners: payload.owners }
            : game
        ),
        loading: false,
      };
    case GAME_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
