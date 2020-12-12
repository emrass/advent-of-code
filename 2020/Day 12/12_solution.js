const fs = require("fs");

function getManhattanDistance([east, north]) {
  return Math.abs(east) + Math.abs(north);
}

function getDirection(action) {
  const directions = {
    E: 0,
    S: 1,
    W: 2,
    N: 3,
  };

  return directions[action] ?? -1;
}

function move({ action, value }, position, direction) {
  const moves = [
    ([east, north], value) => [east + value, north],
    ([east, north], value) => [east, north - value],
    ([east, north], value) => [east - value, north],
    ([east, north], value) => [east, north + value],
  ];

  if (action.match(/^[NESW]$/)) {
    return [moves[getDirection(action)](position, value), direction];
  }

  if (action === "F") {
    return [moves[direction](position, value), direction];
  }

  if (action.match(/^[LR]$/)) {
    if (action === "L") value = 360 - value;
    return [position, Math.abs(direction + value / 90) % 4];
  }
}

function forwardShip(value, [shipE, shipN], [waypointE, waypointN]) {
  const [moveE, moveN] = [
    (waypointE - shipE) * value,
    (waypointN - shipN) * value,
  ];
  return [
    [shipE + moveE, shipN + moveN],
    [waypointE + moveE, waypointN + moveN],
  ];
}

fs.readFile(__dirname + "/input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const input = data.split("\n").map((entry) => {
    const [_, action, value] = entry.match(/^([NSEWLRF])(\d+)$/);
    return { action, value: parseInt(value, 10) };
  });

  let position = [0, 0];
  let direction = 0;
  for (let i = 0; i < input.length; i++) {
    [position, direction] = move(input[i], position, direction);
  }
  console.log("Task 1: ", getManhattanDistance(position));

  let task2pos = {
    ship: [0, 0],
    waypoint: [10, 1],
  };
  for (let i = 0; i < input.length; i++) {
    task2pos = move2(input[i], task2pos);
  }
  console.log("Task 2: ", getManhattanDistance(task2pos.ship));
});

function move2({ action, value }, position) {
  const moves = [
    ([east, north], value) => [east + value, north],
    ([east, north], value) => [east, north - value],
    ([east, north], value) => [east - value, north],
    ([east, north], value) => [east, north + value],
  ];

  if (action.match(/^[NESW]$/)) {
    position.waypoint = moves[getDirection(action)](position.waypoint, value);
    return position;
  }

  if (action === "F") {
    [position.ship, position.waypoint] = forwardShip(
      value,
      position.ship,
      position.waypoint
    );
    return position;
  }

  if (action.match(/^[LR]$/)) {
    const distance = [
      position.waypoint[0] - position.ship[0],
      position.waypoint[1] - position.ship[1],
    ];

    if (action === "L") value = 360 - value;

    if (value === 90) {
      position.waypoint = [
        position.ship[0] + distance[1],
        position.ship[1] - distance[0],
      ];
    } else if (value === 180) {
      position.waypoint = [
        position.ship[0] - distance[0],
        position.ship[1] - distance[1],
      ];
    } else if (value === 270) {
      position.waypoint = [
        position.ship[0] - distance[1],
        position.ship[1] + distance[0],
      ];
    }

    return position;
  }
}
