const fs = require('fs');

function process(arr) {
    return;
}

fs.readFile(process.cwd() + '/input.txt', 'utf8' , (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const input = data.split('\n').map((entry) => {
        return entry;
    });

    console.log(input);

    for (let i = 0; i < input.length; i++) {
        // noop
    }
});

