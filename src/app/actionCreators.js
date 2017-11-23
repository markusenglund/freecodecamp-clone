import axios from "axios";

export const fetchMapData = () => dispatch => {
  axios.get("/public/assets/super-blocks-mock.json").then(res => {
    dispatch({ type: "RECEIVE_MAP_DATA", payload: res.data });
  });
};

export const fetchChallenge = challengeName => dispatch => {
  // TODO: Add logic for aborting fetch when challenge is already fetched or is fetching
  dispatch({ type: "FETCH_CHALLENGE", challengeName });
  axios.get(`/api/challenge/${challengeName}`).then(res => {
    console.log(res);
    dispatch({ type: "RECEIVE_CHALLENGE", challengeName, challenge: res.data });
  });
};
