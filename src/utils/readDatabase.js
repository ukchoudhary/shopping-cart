var fs = require("fs");
const path = require("path");

const read = () => {
  const databse = fs.readFileSync(
    path.resolve(__dirname, "../database/database.json")
  );
  return JSON.parse(databse);
};

module.exports = read;
