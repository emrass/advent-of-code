const fs = require("fs");

function move([startX, startY], direction) {
    switch (direction) {
        case "^":
            return [startX, startY - 1];
        case ">":
            return [startX + 1, startY];
        case "v":
            return [startX, startY + 1];
        case "<":
            return [startX - 1, startY];
        default:
            return [startX, startY];
    }
}

function hash(x, y) {
    return `${x}x${y}`;
}

fs.readFile(__dirname + "/03_input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let currX = 0, currY = 0;
  const visited = new Set();
  visited.add(hash(currX, currY));

  for (let i = 0; i < data.length; i++) {
    [currX, currY] = move([currX, currY], data[i]);
    visited.add(hash(currX, currY));
  }

  let santaX = 0, santaY = 0, roboX = 0, roboY = 0;
  const visited2 = new Set();
  visited.add(hash(santaX, santaY));

  for (let i = 0; i < data.length; i += 2) {
    [santaX, santaY] = move([santaX, santaY], data[i]);
    [roboX, roboY] = move([roboX, roboY], data[i+1]);
    visited2.add(hash(santaX, santaY));
    visited2.add(hash(roboX, roboY));
  }

  console.log("Task 1: ", visited.size);
  console.log("Task 2: ", visited2.size);
});
