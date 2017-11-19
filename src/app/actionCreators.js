import axios from "axios";

// export default function getSvgMap() {
//   return dispatch => {
//     axios.get('/world-110m.json').then(res => {
//       dispatch({
//         type: 'GET_SVG_MAP',
//         data: feature(res.data, res.data.objects.land)
//       });
//     });
//   };
// }

const fetchMapData = () => dispatch => {
  axios.get("/public/assets/super-blocks.json").then(res => {
    dispatch({ type: "RECEIVE_MAP_DATA", payload: res.data });
  });
};

export { fetchMapData };
