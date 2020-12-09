const fs = require("fs");

function countOccurences(string, char, escape = false) {
    return (string.match(new RegExp(`${escape ? "\\" : ""}${char}`, "g")) || []).length;
}

function getBasementIdx(string, charUp, charDown) {
    if (!string) return 0;

    let runningCounter = 0;
    for (let i = 0; i < string.length; i++) {
        if (string[i] === charUp) {
            runningCounter++;
        } else if (string[i] === charDown) {
            runningCounter--;
        }

        if (runningCounter < 0) return i;
    }

    return 0;
}

fs.readFile(__dirname + "/01_input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log("Task 1: ", countOccurences(data, "(", true) - countOccurences(data, ")", true));
  console.log("Task 2: ", getBasementIdx(data, "(", ")") + 1); // +1 because the function is index-based (which starts at 0)
});
