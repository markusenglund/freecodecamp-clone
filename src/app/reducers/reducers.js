const counter = (state = 1, action) => {
  switch (action.type) {
    case "INCREMENT": {
      return state + 2;
    }
    default:
      return state;
  }
};

const map = (state = {}, action) => {
  switch (action.type) {
    case "RECEIVE_MAP_DATA": {
      return action.payload;
    }
    case "TOGGLE_EXPANSION": {
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          isOpen: !state[action.payload].isOpen
        }
      };
    }
    default:
      return state;
  }
};

export default { counter, map };
