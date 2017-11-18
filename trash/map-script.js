const fs = require("fs");

const json = JSON.parse(fs.readFileSync("./challenge-map.json", "utf8"));
const mapData = JSON.stringify(json.data.entities.block);
fs.writeFileSync("map.json", mapData);
