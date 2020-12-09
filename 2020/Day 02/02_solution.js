const fs = require('fs');

function checkPW({ password, min, max, char }) {
    noOfOccurences = (password.match(new RegExp(char, "g")) || []).length;
    return noOfOccurences >= min && noOfOccurences <= max;
}

function checkPW2({ password, first, second, char }) {
    return (password[first-1] === char) ^ (password[second-1] === char);
}

fs.readFile(process.cwd() + '/input.txt', 'utf8' , (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const input = data.split('\n').map(entry => {
        const match = entry.match(/^(\d+)-(\d+) (\w): (\w+)/m);
        return({
            min: match[1],
            max: match[2],
            char: match[3],
            password: match[4]
        })
    });

    let countCorrectPW1 = 0;
    let countCorrectPW2 = 0;
    const len = input.length;
    for (let i = 0; i < len; i++) {
        if (checkPW(input[i])) countCorrectPW1++;
        if (checkPW2({ password: input[i].password, first: input[i].min, second: input[i].max, char: input[i].char })) countCorrectPW2++;
    }
    console.log(countCorrectPW1, countCorrectPW2);
});