var fs = require("fs");
const path = require("path");

const write = (data) => {
  const json = JSON.stringify(data);
  fs.writeFileSync(path.resolve(__dirname, "../database/database.json"), json);
};

module.exports = write;
