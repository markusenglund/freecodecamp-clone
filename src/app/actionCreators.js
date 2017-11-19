import axios from "axios";
import { setTimeout } from "timers";

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
  setTimeout(
    () => dispatch({ type: "RECEIVE_MAP_DATA", payload: [1, 2, 3] }),
    1000
  );
};

export { fetchMapData };
