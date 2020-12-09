const fs = require('fs');

function breakDownRule(rule) {
    const matcher = rule.match(/^(\S+ \S+) bags? contain (no other bags?|((, )?\d+ [a-z]+ [a-z]+ bags?)+)\.$/m);
    const shell = matcher[1];
    const contentStr = matcher[2].replace(/ ?bags?/g, "");
    
    const contents = contentStr.split(", ").map(content => {
        if (content === "no other") return { amount: 0, type: "no other"};
        const contentMatch = content.match(/^(\d+) (\S+ \S+)/);
        return {
            amount: parseInt(contentMatch[1], 10),
            type: contentMatch[2],
        }
    });

    return {
        shell,
        contents,
    }
}

function *findPaths(graph, src, dst, path=[], visited=(new Set())) {
    if (src === dst) {
      yield path.concat(dst);
    }
    else if (graph[src] && !visited.has(src)) {
      visited.add(src);
      path.push(src);
      
      for (const neighbor of graph[src]) {
        yield *findPaths(graph, neighbor.type, dst, path, visited);
      }
      
      visited.delete(src);
      path.pop(src);
    }
  };

fs.readFile(process.cwd() + '/input.txt', 'utf8' , (err, data) => {
    const target = "shiny gold";
    
    if (err) {
      console.error(err);
      return;
    }
    const graph = data.split('\n').reduce((accumulator, current) => {
        const brokenDown = breakDownRule(current);
        accumulator[brokenDown.shell] = brokenDown.contents;
        return accumulator;
    }, {});

    const keys = Object.keys(graph);
    let resultsCount = 0;
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] === target) continue;
        if (Array.from(findPaths(graph, keys[i], target)).length > 0) resultsCount++;
    }

    console.log("Task 1", resultsCount);
});


fs.readFile(process.cwd() + '/input.txt', 'utf8' , (err, data) => {
    const target = "shiny gold";
    
    if (err) {
      console.error(err);
      return;
    }
    const graph = data.split('\n').reduce((accumulator, current) => {
        const brokenDown = breakDownRule(current);
        accumulator[brokenDown.shell] = brokenDown.contents;
        return accumulator;
    }, {});

    console.log("Task 2", getNoOfBags(graph, target));
});

function getNoOfBags(graph, target) {
    let result = 0;

    const neighbors = graph[target];

    for (let i = 0; i < neighbors.length; i++) {
        if (!graph[neighbors[i].type]) continue;
        result += neighbors[i].amount + neighbors[i].amount * getNoOfBags(graph, neighbors[i].type);
    }
    
    return result;
}