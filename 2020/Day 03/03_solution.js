const fs = require('fs');

function treeCounter(arr, stepRow, stepCol) {
    const width = arr[0].length - 1;
    const height = arr.length - 1;
    let row = stepRow, column = stepCol; // 0;0 is not counted, so start counting after taking first step
    let treeCount = 0;
    while (row <= height) {
        if (arr[row][column] === "#") treeCount++;
        row = row + stepRow;
        column = (column + stepCol) % (width+1); // overflow happens at width + 1
    }
    return treeCount;
}

fs.readFile(process.cwd() + '/input.txt', 'utf8' , (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const input = data.split('\n');

    if (input.length === 0 || input[0].length === 0) return;

    console.log(treeCounter(input, 1, 3));
    console.log(treeCounter(input, 1, 1) * treeCounter(input, 1, 3) * treeCounter(input, 1, 5) * treeCounter(input, 1, 7) * treeCounter(input, 2, 1));
});

