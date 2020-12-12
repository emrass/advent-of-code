const fs = require("fs");

function countInGrid(grid, str) {
  return grid.reduce(
    (sum, cur) => sum + (cur.join("").match(new RegExp(str, "g")) || []).length,
    0
  );
}

function sumInGrid(grid) {
  const rowReducer = (sum, cur) => sum + cur;
  const lineReducer = (sum, cur) => sum + cur.reduce(rowReducer, 0);

  return grid.reduce(lineReducer, 0);
}

function parseInstructions(instruction) {
  const [_, inst, startX, startY, endX, endY] = instruction.match(
    /^(toggle|turn on|turn off) (\d+),(\d+) through (\d+),(\d+)$/
  );

  return {
    startX: parseInt(startX, 10),
    startY: parseInt(startY, 10),
    endX: parseInt(endX, 10),
    endY: parseInt(endY, 10),
    inst: inst.replace("turn ", ""),
  };
}

function toggle(light) {
  return light === 1 ? 0 : 1;
}

function applyInstructions(grid, { startX, startY, endX, endY, inst }) {
  for (let y = startY; y <= endY; y++) {
    for (let x = startX; x <= endX; x++) {
      grid[y][x] = inst === "on" ? 1 : inst === "off" ? 0 : toggle(grid[y][x]);
    }
  }
  return grid;
}

function applyInstructions2(grid, { startX, startY, endX, endY, inst }) {
  for (let y = startY; y <= endY; y++) {
    for (let x = startX; x <= endX; x++) {
      if (inst === "on") grid[y][x] += 1;
      if (inst === "off") grid[y][x] = grid[y][x] >= 1 ? grid[y][x] - 1 : 0;
      if (inst === "toggle") grid[y][x] += 2;
    }
  }
  return grid;
}

function initializeGrid(initialVal = 0, sizeY = 1000, sizeX = 1000) {
  return Array(sizeY)
    .fill()
    .map(() => Array(sizeX).fill(initialVal));
}

fs.readFile(__dirname + "/06_input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const instructions = data.split("\n").map(parseInstructions);
  let grid = initializeGrid(),
    grid2 = initializeGrid();

  for (let i = 0; i < instructions.length; i++) {
    grid = applyInstructions(grid, instructions[i]);
    grid2 = applyInstructions2(grid2, instructions[i]);
  }

  console.log("Task 1: ", countInGrid(grid, "1"));
  console.log("Task 2: ", sumInGrid(grid2));
});
