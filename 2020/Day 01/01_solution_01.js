const fs = require('fs');

function findTwoNumbers(arr, matcher) {
    l = arr.length;
    for (let i = 0; i < arr.length; i++) {
        for (let j = i+1; j < arr.length; j++) {
            if (arr[i] + arr[j] === matcher) {
                return arr[i]*arr[j];
            }
        }
    }
    return 0;
}

function findThreeNumbers(arr, matcher) {
    l = arr.length;
    for (let i = 0; i < arr.length; i++) {
        for (let j = i+1; j < arr.length; j++) {
            for (let k = j+1; k < l; k++) {
                if (arr[i] + arr[j] + arr[k] === 2020) {
                    return arr[i]*arr[j]*arr[k];
                }
            }
        }
    }
    return 0;
}

fs.readFile(process.cwd() + '/input01.txt', 'utf8' , (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const input = data.split('\n').map(n => parseInt(n, 10));

    console.log(findTwoNumbers(input, 2020));
    console.log(findThreeNumbers(input, 2020));
});

