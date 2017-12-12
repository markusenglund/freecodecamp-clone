import { createSelector } from "reselect";

const getCurrentChallengeName = state => state.router.pathname.split("/")[2];
const getMap = state => state.map;

export const getNextChallengeName = createSelector(
  [getCurrentChallengeName, getMap],
  (currentChallengeName, map) => {
    let nextChallengeName = "";
    if (Object.keys(map).length > 0) {
      const challengeNames = Object.values(map)
        .reduce(
          (acc, superBlock) => acc.concat(Object.values(superBlock.blocks)),
          []
        )
        .reduce((acc, block) => acc.concat(Object.keys(block.challenges)), []);
      const currentIndex = challengeNames.findIndex(
        challengeName => challengeName === currentChallengeName
      );
      nextChallengeName = challengeNames[currentIndex + 1];
    }
    return nextChallengeName;
  }
);

const getRouter = state => state.router;

export const getHeadTitle = createSelector([getRouter], router => {
  if (router.result) {
    if (router.pathname === "/about") {
      return `${router.result.title} - Very very neat`;
    }
    return router.result.title;
  }
  return "No router title";
});
