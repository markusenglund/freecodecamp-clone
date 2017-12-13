const fs = require("fs");

const json = JSON.parse(fs.readFileSync("./trash/challenge-map.json", "utf8"));

const superBlocks = json.data.entities.superBlock;
const blocks = json.data.entities.block;
const challenges = json.data.entities.challenge;

const newSuperBlocks = Object.keys(superBlocks).reduce(
  (acc, superBlockKey) => ({
    ...acc,
    [superBlockKey]: {
      title: superBlocks[superBlockKey].title,
      // order: superBlocks[superBlockKey].order,
      blocks: Object.keys(blocks).reduce((acc2, blockKey) => {
        if (blocks[blockKey].superBlock === superBlockKey) {
          return {
            ...acc2,
            [blockKey]: {
              title: blocks[blockKey].title,
              // order: blocks[blockKey].order,
              isLocked: blocks[blockKey].isLocked,
              time: blocks[blockKey].time,
              // id: blocks[blockKey].id,
              challenges: Object.keys(challenges).reduce(
                (acc3, challengeKey) => {
                  if (challenges[challengeKey].block === blockKey) {
                    // console.log(challenges[challengeKey].required);
                    return {
                      ...acc3,
                      [challengeKey]: {
                        title: challenges[challengeKey].title,
                        // id: challenges[challengeKey].id,
                        challengeType: challenges[challengeKey].challengeType,
                        time: challenges[challengeKey].time
                        // order: challenges[challengeKey].suborder
                      }
                    };
                  }
                  return { ...acc3 };
                },
                {}
              )
            }
          };
        }
        return { ...acc2 };
      }, {})
    }
  }),
  {}
);

fs.writeFileSync(
  "src/assets/data/super-blocks-mock.json",
  JSON.stringify(newSuperBlocks)
);
