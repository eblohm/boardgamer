import axios from 'axios';
import { setAlert } from './alert';
import {
  ADD_GAME,
  DELETE_GAME,
  GAME_ERROR,
  GET_GAMES,
  GET_GAME,
  GET_OWNERS,
  UPDATE_GAME_LIKES,
  UPDATE_GAME_OWNERS,
  GET_OWNED_GAMES,
} from './types';

// get games a user owns
export const getOwnedGames = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/games/owner/${userId}`);

    dispatch({
      type: GET_OWNED_GAMES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GAME_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// add game
export const addGame = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(`/api/games`, formData, config);

    dispatch({
      type: ADD_GAME,
      payload: res.data,
    });

    dispatch(setAlert('Game added', 'success'));
  } catch (error) {
    dispatch({
      type: GAME_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// get games
export const getGames = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/games');

    dispatch({ type: GET_GAMES, payload: res.data });
  } catch (error) {
    dispatch({
      type: GAME_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// get a game
export const getGame = (gameId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/games/${gameId}`);

    dispatch({ type: GET_GAME, payload: res.data });
  } catch (error) {
    dispatch({
      type: GAME_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// add like
export const addLike = (gameId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/games/like/${gameId}`);

    dispatch({ type: UPDATE_GAME_LIKES, payload: { gameId, likes: res.data } });
  } catch (error) {
    dispatch({
      type: GAME_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// remove like
export const removeLike = (gameId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/games/unlike/${gameId}`);

    dispatch({ type: UPDATE_GAME_LIKES, payload: { gameId, likes: res.data } });
  } catch (error) {
    dispatch({
      type: GAME_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// delete game
export const deleteGame = (gameId) => async (dispatch) => {
  try {
    await axios.delete(`/api/games/${gameId}`);

    dispatch({
      type: DELETE_GAME,
      payload: gameId,
    });

    dispatch(setAlert('Game removed', 'success'));
  } catch (error) {
    dispatch({
      type: GAME_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// get owners
export const getOwners = (gameId) => async (dispatch) => {
  const res = await axios.get(`/api/games/owners/${gameId}`);

  dispatch({
    type: GET_OWNERS,
    payload: res.data,
  });
};

// add owner
export const addOwner = (gameId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/games/owners/new/${gameId}`);

    dispatch({
      type: UPDATE_GAME_OWNERS,
      payload: { gameId, owners: res.data },
    });
  } catch (error) {
    dispatch({
      type: GAME_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// remove owner
export const removeOwner = (gameId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/games/owners/remove/${gameId}`);

    dispatch({
      type: UPDATE_GAME_OWNERS,
      payload: { gameId, owners: res.data },
    });
  } catch (error) {
    dispatch({
      type: GAME_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
