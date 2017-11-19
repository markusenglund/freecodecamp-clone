const fs = require("fs");

const json = JSON.parse(fs.readFileSync("./trash/challenge-map.json", "utf8"));
const superBlocks = JSON.stringify(json.data.entities.superBlock);

fs.writeFileSync("super-blocks.json", superBlocks);
