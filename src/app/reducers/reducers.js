import initialMapState from "./initial-map-state.json";

const counter = (state = 1, action) => {
  switch (action.type) {
    case "INCREMENT": {
      return state + 2;
    }
    default:
      return state;
  }
};

const sidebar = (state = { isOpen: false }, action) => {
  switch (action.type) {
    case "TOGGLE_SIDEBAR_OPEN": {
      return { isOpen: !state.isOpen };
    }
    default:
      return state;
  }
};

const challenges = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_CHALLENGE": {
      return {
        ...state,
        [action.challengeName]: {
          ...state[action.challengeName],
          isFetching: true
        }
      };
    }
    case "RECEIVE_CHALLENGE": {
      return {
        ...state,
        [action.challengeName]: { ...action.challenge, isFetching: false }
      };
    }
    case "TEST_CHALLENGE_CODE": {
      return {
        ...state,
        [action.challengeName]: {
          ...action.challenge,
          tests: action.challenge.tests.map((test, i) => ({
            ...test,
            hasPassed: action.testStatuses[i]
          }))
        }
      };
    }
    default:
      return state;
  }
};

const map = (state = initialMapState, action) => {
  switch (action.type) {
    // case "RECEIVE_MAP_DATA": {
    //   return action.payload;
    // }
    case "TOGGLE_SUPER_BLOCK_EXPANSION": {
      const superBlockKey = action.payload;
      return {
        ...state,
        [superBlockKey]: {
          ...state[superBlockKey],
          isOpen: !state[superBlockKey].isOpen
        }
      };
    }
    case "TOGGLE_BLOCK_EXPANSION": {
      const { blockKey, superBlockKey } = action.payload;
      // This def causes mutations. Do I care?
      return {
        ...state,
        [superBlockKey]: {
          ...state[superBlockKey],
          blocks: {
            ...state[superBlockKey].blocks,
            [blockKey]: {
              ...state[superBlockKey].blocks[blockKey],
              isOpen: !state[superBlockKey].blocks[blockKey].isOpen
            }
          }
        }
      };
    }
    default:
      return state;
  }
};

export default { sidebar, challenges, map, counter };
