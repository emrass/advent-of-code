const fs = require("fs");

function process(arr) {
  return;
}

fs.readFile(__dirname + "/input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const input = data.split("\n").map((entry) => {
    const instr = entry.split(" ");
    instr[1] = parseInt(instr[1]);
    return instr;
  });

  console.log("Taske 1", fnMachine(input));
  console.log("Task 2", fnFixedMachine(input));
});

function fnMachine(instructions) {
  let visitedIdxSet = new Set();
  let currentIdx = 0;
  let accumulator = 0;

  while (!visitedIdxSet.has(currentIdx) && currentIdx < instructions.length) {
    visitedIdxSet.add(currentIdx);
    const [operation, chg] = instructions[currentIdx];
    if (operation === "nop") {
      currentIdx++;
    } else if (operation === "acc") {
      accumulator += chg;
      currentIdx++;
    } else if (operation === "jmp") {
      currentIdx += chg;
    } else {
      return "should not happen: " + currentIdx;
    }
  }
  return accumulator;
}

function fnFixedMachine(instructions) {
  let visitedIdxSet = new Set();
  let currentIdx = 0;
  const potentialCulprits = [];

  // first run into a loop and track what operations are being executed
  while (!visitedIdxSet.has(currentIdx) && currentIdx < instructions.length) {
    visitedIdxSet.add(currentIdx);
    const [operation, chg] = instructions[currentIdx];
    if (operation === "nop") {
      potentialCulprits.push(currentIdx);
      currentIdx++;
    } else if (operation === "acc") {
      currentIdx++;
    } else if (operation === "jmp") {
      potentialCulprits.push(currentIdx);
      currentIdx += chg;
    } else {
      return "should not happen: " + currentIdx;
    }

    if (currentIdx > instructions.length - 1) return accumulator;
  }

  // brute force - change one opearation at a time, check if machine terminates
  for (let i = 0; i < potentialCulprits.length; i++) {
    let visitedIdxSet = new Set();
    let currentIdx = 0;
    let accumulator = 0;
    while (!visitedIdxSet.has(currentIdx)) {
      visitedIdxSet.add(currentIdx);
      let [operation, chg] = instructions[currentIdx];

      // important!
      if (currentIdx === potentialCulprits[i])
        operation = operation === "nop" ? "jmp" : "nop";

      if (operation === "nop") {
        currentIdx++;
      } else if (operation === "acc") {
        accumulator += chg;
        currentIdx++;
      } else if (operation === "jmp") {
        currentIdx += chg;
      } else {
        return "should not happen: " + currentIdx;
      }

      if (currentIdx > instructions.length - 1) return accumulator;
    }
  }
}
