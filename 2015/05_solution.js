const fs = require("fs");

function isNice(str) {
    return (
        (str.match(/[aeiou]/g) || []).length >= 3 // rule 1
        && !!str.match(/([a-zA-Z])\1+/) // rule 2
        && !str.match(/ab|cd|pq|xy/) // rule 3
    )
}

function isNiceRevised(str) {
    return (
        !!str.match(/([a-zA-Z][a-zA-Z])[a-zA-Z]*\1/) // rule 1
        && !!str.match(/([a-zA-Z])[a-zA-Z]\1/) // rule 2
    )
}

fs.readFile(__dirname + "/05_input.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const input = data.split("\n");
    const niceCount = input.reduce((acc, cur) => {
        return acc + ((isNice(cur) ? 1 : 0));
    }, 0);
    const niceCountRevised = input.reduce((acc, cur) => {
        return acc + ((isNiceRevised(cur) ? 1 : 0));
    }, 0);

    console.log("Task 1: ", niceCount);
    console.log("Task 2: ", niceCountRevised);
  });
  