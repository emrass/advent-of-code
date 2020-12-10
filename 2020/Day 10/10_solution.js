const fs = require("fs");

function getDeviceAdapterJoltage(adapters) {
  return Math.max(...adapters) + 3;
}

function getNextAdapter(adapters, [minJoltage, maxJoltage]) {
  return adapters.filter((j) => j >= minJoltage && j <= maxJoltage)[0];
}

function getAdaptersInRange(adapters, [minJoltage, maxJoltage]) {
  return adapters.filter((j) => j >= minJoltage && j <= maxJoltage);
}

function countDiffs(adapters) {
  const result = {};
  let currentJoltage = 0;

  for (let i = 0; i < adapters.length; i++) {
    const currAdapter = getNextAdapter(adapters, [
      currentJoltage + 1,
      currentJoltage + 3,
    ]);

    result[currAdapter - currentJoltage] = result[currAdapter - currentJoltage]
      ? result[currAdapter - currentJoltage] + 1
      : 1;

    currentJoltage = currAdapter;
  }

  return result;
}

function countCombinations(adapters, startingJoltage = 0) {
  const combinationCountAtAdapter = {};
  let currentJoltage = startingJoltage;
  for (let i = 0; i < adapters.length; i++) {
    currentJoltage = adapters[i];
    // account for 0 (first step) - applies if in range of starting joltage
    // -> increase combination counter of applicable adapters by 1 (step from 0 to the adapter)
    combinationCountAtAdapter[currentJoltage] =
      currentJoltage <= startingJoltage + 3 ? 1 : 0;

    const inboundAdapters = getAdaptersInRange(adapters, [
      currentJoltage - 3,
      currentJoltage - 1,
    ]);

    // The combination count at adapter n is the sum of combination counts of its potential inbound adapters
    // (i.e. adapters that can reach n)
    combinationCountAtAdapter[currentJoltage] += inboundAdapters.reduce(
      (acc, cur) => acc + combinationCountAtAdapter[cur],
      0
    );
  }
  return combinationCountAtAdapter[currentJoltage];
}

fs.readFile(__dirname + "/input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const adapters = data.split("\n").map((a) => parseInt(a, 10));
  const deviceAdapterJoltage = getDeviceAdapterJoltage(adapters);
  adapters.push(deviceAdapterJoltage);
  adapters.sort((a, b) => a - b);

  const diffs = countDiffs(adapters);

  console.log("Task 1:", diffs[1] * diffs[3]);
  console.log("Task 2: ", countCombinations(adapters, 0));
});
