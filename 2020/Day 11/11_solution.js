const fs = require("fs");

function isSeat(map, [seatX, seatY]) {
  return map[seatY][seatX].match(/[#L]/);
}

function isOccupied(map, [seatX, seatY]) {
  return map[seatY][seatX] === "#";
}

function countOccupiedNeighbors(map, [seatX, seatY]) {
  let result = 0;
  for (let y = seatY - 1; y <= seatY + 1; y++) {
    if (y < 0 || y >= map.length) continue;
    for (let x = seatX - 1; x <= seatX + 1; x++) {
      if (x < 0 || x >= map[y].length || (x === seatX && y === seatY)) continue;
      result += isOccupied(map, [x, y]) ? 1 : 0;
    }
  }
  return result;
}

function countOccupiedLOS(map, [seatX, seatY]) {
  let result = 0;

  // up
  for (let y = seatY - 1; y >= 0; y--) {
    if (isOccupied(map, [seatX, y])) result++;
    if (isSeat(map, [seatX, y])) break;
  }
  // down
  for (let y = seatY + 1; y < map.length; y++) {
    if (isOccupied(map, [seatX, y])) result++;
    if (isSeat(map, [seatX, y])) break;
  }
  // left
  for (let x = seatX - 1; x >= 0; x--) {
    if (isOccupied(map, [x, seatY])) result++;
    if (isSeat(map, [x, seatY])) break;
  }
  // right
  for (let x = seatX + 1; x < map[seatY].length; x++) {
    if (isOccupied(map, [x, seatY])) result++;
    if (isSeat(map, [x, seatY])) break;
  }
  // diagonal left up
  for (let y = seatY - 1, x = seatX - 1; y >= 0 && x >= 0; y--, x--) {
    if (isOccupied(map, [x, y])) result++;
    if (isSeat(map, [x, y])) break;
  }
  // diagonal left down
  for (let y = seatY + 1, x = seatX - 1; y < map.length && x >= 0; y++, x--) {
    if (isOccupied(map, [x, y])) result++;
    if (isSeat(map, [x, y])) break;
  }
  // diagonal right up
  for (
    let y = seatY - 1, x = seatX + 1;
    y >= 0 && x < map[y].length;
    y--, x++
  ) {
    if (isOccupied(map, [x, y])) result++;
    if (isSeat(map, [x, y])) break;
  }
  // diagonal right down
  for (
    let y = seatY + 1, x = seatX + 1;
    y < map.length && x < map[y].length;
    y++, x++
  ) {
    if (isOccupied(map, [x, y])) result++;
    if (isSeat(map, [x, y])) break;
  }
  return result;
}

function countOccupiedSeats(map) {
  let result = 0;

  for (let i = 0; i < map.length; i++) {
    result += (map[i].match(/#/g) || []).length;
  }

  return result;
}

function applyRules(map, [seatX, seatY]) {
  const occNeighCount = countOccupiedNeighbors(map, [seatX, seatY]);

  if (map[seatY][seatX] === "L" && occNeighCount === 0) {
    return "#";
  } else if (map[seatY][seatX] === "#" && occNeighCount >= 4) {
    return "L";
  }
  return map[seatY][seatX];
}

function applyRules2(map, [seatX, seatY]) {
  const occLOSCount = countOccupiedLOS(map, [seatX, seatY]);

  if (map[seatY][seatX] === "L" && occLOSCount === 0) {
    return "#";
  } else if (map[seatY][seatX] === "#" && occLOSCount >= 5) {
    return "L";
  }
  return map[seatY][seatX];
}

function process(map, rulesFn) {
  const result = [];
  let chgCounter = 0;
  for (let y = 0; y < map.length; y++) {
    result[y] = "";
    for (let x = 0; x < map[y].length; x++) {
      result[y] += rulesFn(map, [x, y]);
      if (map[y][x] !== result[y][x]) chgCounter++;
    }
  }
  return [result, chgCounter];
}

fs.readFile(__dirname + "/input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Task 1
  let map = data.split("\n");
  let noOfChanges = 0;
  do {
    [map, noOfChanges] = process(map, applyRules);
  } while (noOfChanges !== 0);
  console.log("Task 1: ", countOccupiedSeats(map));

  // Task 2
  map = data.split("\n");
  noOfChanges = 0;
  do {
    [map, noOfChanges] = process(map, applyRules2);
  } while (noOfChanges !== 0);
  console.log("Task 2: ", countOccupiedSeats(map));
});
