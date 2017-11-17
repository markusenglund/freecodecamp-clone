import { createSelector } from "reselect";

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

export const getHeadDescription = createSelector(
  [getRouter],
  router =>
    (router.result && router.result.description) ||
    "The greatest website of all time"
);
