const { match } = require('assert');
const fs = require('fs');

function seatToNumber(str) {
    const row = str.substring(0, 7);
    const seat = str. substring(7, 10);
    
    const binaryRow = row.replaceAll("F", "0").replaceAll("B", 1);
    const binarySeat = seat.replaceAll("L", "0").replaceAll("R", 1);

    return [parseInt(binaryRow, 2), parseInt(binarySeat, 2)];
}

function getSeatId([row, seat]) {
    return row * 8 + seat;
}

fs.readFile(process.cwd() + '/input.txt', 'utf8' , (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const seatIds = data.split('\n').map((entry) => {
        return getSeatId(seatToNumber(entry));
    });

    console.log(Math.max(...seatIds));

    sortedSeatIds = seatIds.sort();

    for (let i = 1; i < sortedSeatIds.length - 1; i++) { // skip first entry and last entry since it's not at front or back
        if (sortedSeatIds[i-1] === sortedSeatIds[i] - 2) console.log(sortedSeatIds[i] - 1);
    }
});