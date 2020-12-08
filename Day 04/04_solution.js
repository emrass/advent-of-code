const fs = require('fs');

function isValid(passportStr) {
    if (!passportStr) return;

    return (
        passportStr.includes('byr:') &&
        passportStr.includes('iyr:') &&
        passportStr.includes('eyr:') &&
        passportStr.includes('hgt:') &&
        passportStr.includes('hcl:') &&
        passportStr.includes('ecl:') &&
        passportStr.includes('pid:')
    );
}

function isValidStrong(passportStr) {
    if (!passportStr) return;

    return (
        new RegExp("byr:(19[2-9][0-9]|200[0-2])[ \n]").test(passportStr) &&
        new RegExp("iyr:(201[0-9]|2020)[ \n]").test(passportStr) &&
        new RegExp("eyr:(202[0-9]|2030)[ \n]").test(passportStr) &&
        new RegExp("hgt:(1[5-8][0-9]cm|19[0-3]cm|59in|6[0-9]in|7[0-6]in)[ \n]").test(passportStr) &&
        new RegExp("hcl:#[0-9a-fA-F]{6}").test(passportStr) &&
        new RegExp("ecl:(amb|blu|brn|gry|grn|hzl|oth)[ \n]").test(passportStr) &&
        new RegExp("pid:[0-9]{9}[ \n]").test(passportStr)
    );
}

function passportStrToObj(passportStr) {
    const attributes = passportStr.split(/[ \n]/); // attributes are seperated by space or linefeeds

    return attributes.reduce((accumulator, currentValue) => {
        const [key, val] = currentValue.split(":");
        accumulator[key] = val;
        return accumulator;
    }, {});
}

function isValidObj({ byr, iyr, eyr, hgt, hcl, ecl, pid }) {
    if (!byr || parseInt(byr) < 1920 || parseInt(byr) > 2002) return false;
    if (!iyr || parseInt(iyr) < 2010 || parseInt(iyr) > 2020) return false;
    if (!eyr || parseInt(eyr) < 2020 || parseInt(eyr) > 2030) return false;
    if (!hgt || !/^(1[5-8][0-9]cm|19[0-3]cm|59in|6[0-9]in|7[0-6]in)$/.test(hgt)) return false;
    if (!hcl || !(hcl.length === 7) || !/#[0-9a-fA-F]+$/.test(hcl)) return false;
    if (!ecl || !/^(amb|blu|brn|gry|grn|hzl|oth)$/.test(ecl)) return false;
    if (!pid || !(pid.length === 9) || !/^\d+$/.test(pid)) return false;
    
    return true;
}

fs.readFile(process.cwd() + '/input.txt', 'utf8' , (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const input = data.split('\n\n');
    let validCounter = 0;
    let validCounterStrong = 0;
    let validCounterObj = 0;
    for (let i = 0; i < input.length; i++) {
        if (isValid(input[i])) validCounter++;
        if (isValidStrong(input[i] + '\n')) validCounterStrong++; // I'm having issues matching an optional end of line, so just always append one :)
        if (isValidObj(passportStrToObj(input[i]))) validCounterObj++;

        if (isValidStrong(input[i] + '\n') !== isValidObj(passportStrToObj(input[i]))) console.log("error:", isValidStrong(input[i] + '\n'), input[i], passportStrToObj(input[i]));
    }
    console.log(validCounter, validCounterStrong, validCounterObj);
});

