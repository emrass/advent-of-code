const MD5 = require("./utils/md5")

function hash(secret, number) {
    return MD5(secret + number.toString());
}

const secret = "iwrupvqb";
let counter = 0;
let candidate = hash(secret, counter);
while (!candidate.match(/^0{5}/)) {
    counter++;
    candidate = hash(secret, counter);
}
console.log("Task 1: ", counter);

counter = 0;
while (!candidate.match(/^0{6}/)) {
    counter++;
    candidate = hash(secret, counter);
}
console.log("Task 2: ", counter);
