const fs = require('fs');

function getNoOfYesInGroup(groupAnswers) {
    const individualAnswers = groupAnswers.split('\n');
    const answerSet = new Set();
    let result = 0;

    for (let i = 0; i < individualAnswers.length; i++) {
        for (j = 0; j < individualAnswers[i].length; j++) {
            if (!answerSet.has(individualAnswers[i][j])) {
                answerSet.add(individualAnswers[i][j]);
                result++;
            }
        }
    }
    
    return result;
}

function getNoOfAllYesInGroup(groupAnswers) {
    const individualAnswers = groupAnswers.split('\n');
    const answerCount = {};
    let result = 0;

    for (let i = 0; i < individualAnswers.length; i++) {
        for (j = 0; j < individualAnswers[i].length; j++) {
            if (answerCount[individualAnswers[i][j]]) {
                answerCount[individualAnswers[i][j]] += 1;
            } else {
                answerCount[individualAnswers[i][j]] = 1;
            }
        }
    }
    
    const keys = Object.keys(answerCount);
    for (let i = 0; i < keys.length; i++) {
        if (answerCount[keys[i]] === individualAnswers.length) result++;
    }
    
    return result;
}

function getNoOfAllYesInGroupImproved(groupAnswers) {
    const individualAnswers = groupAnswers.split('\n');
    const allAnswersYesSet = new Set();
    
    if (individualAnswers.length === 0) return 0;
    if (individualAnswers.length === 1) return individualAnswers[0].length;

    for (let i = 0; i < individualAnswers[0].length; i++) {
        allAnswersYesSet.add(individualAnswers[0][i]);
    }
    
    for (let i = 1; i < individualAnswers.length; i++) {
        allAnswersYesSet.forEach(nr => {
            if (!individualAnswers[i].includes(nr)) allAnswersYesSet.delete(nr);
        })
    }

    return allAnswersYesSet.size;
}

fs.readFile(process.cwd() + '/input.txt', 'utf8' , (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const groupInput = data.split('\n\n').map((entry) => {
        return entry;
    });

    let sumOfCounts = 0;
    let sumOfAllCounts = 0;
    let sumOfAllCountsImproved = 0;
    for (let i = 0; i < groupInput.length; i++) {
        sumOfCounts += getNoOfYesInGroup(groupInput[i]);
        sumOfAllCounts += getNoOfAllYesInGroup(groupInput[i]);
        sumOfAllCountsImproved += getNoOfAllYesInGroupImproved(groupInput[i]);
    }
    console.log(sumOfCounts, sumOfAllCounts, sumOfAllCountsImproved);
});
