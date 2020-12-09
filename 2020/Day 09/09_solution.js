const fs = require("fs");

function getPossibleSums(preamble) {
  const result = new Set();

  for (let i = 0; i < preamble.length - 1; i++) {
    for (let j = i + 1; j < preamble.length; j++) {
      result.add(preamble[i] + preamble[j]);
      // console.log(i, j);
    }
  }
  return result;
}

function findContiguous(input, target) {
  for (let i = 1; i < input.length; i++) {
    let currentSum = input[i - 1] + input[i];
    if (currentSum === target) return currentSum;

    let j = i + 1;
    while (currentSum < target && j < input.length) {
      currentSum += input[j];
      j++;
    }
    if (currentSum === target) {
      const summands = input.slice(i, j);
      return Math.min(...summands) + Math.max(...summands);
    }
  }
}

fs.readFile(__dirname + "/input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const preambleSize = 25;

  const input = data.split("\n").map((entry) => {
    return parseInt(entry, 10);
  });

  let target = 0;
  for (let i = preambleSize; i < input.length; i++) {
    const possibleSums = getPossibleSums(input.slice(i - preambleSize, i));
    if (!possibleSums.has(input[i])) {
      target = input[i];
      console.log("Task 1: ", input[i]);
      break;
    }
  }

  console.log("Task 2: ", findContiguous(input, target));
});
