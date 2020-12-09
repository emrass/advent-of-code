const fs = require("fs");

function getVolume(l, w, h) {
    return l * w * h;
}

function getRibbonLength(l, w, h) {
    const sortedDimensions = [l, w, h].sort((a, b) => (a - b));
    return 2 * sortedDimensions[0] + 2 * sortedDimensions[1];
}

function getSurfaceArea(l, w, h) {
    return 2 * l * w + 2 * w * h + 2 * h * l;
}

function getContingency(l, w, h) {
    const sortedDimensions = [l, w, h].sort((a, b) => (a - b));
    return sortedDimensions[0] * sortedDimensions[1];
}

fs.readFile(__dirname + "/02_input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const input = data.split("\n").map((dimensions) => {
      return dimensions.split("x").map((d) => parseInt(d, 10));
  });

  const surfaceArea = input.reduce((acc, cur) => {
    return acc + getSurfaceArea(...cur) + getContingency(...cur);
  }, 0);

  const ribbonLength = input.reduce((acc, cur) => {
    return acc + getRibbonLength(...cur) + getVolume(...cur);
  }, 0);
  
  console.log("Task 1: ", surfaceArea);
  console.log("Task 2: ", ribbonLength);
});
