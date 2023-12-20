function finalFunc(map) {
  function find_path(map) {
    let start = null;
    for (let row = 0; row < map.length; row++) {
      for (let col = 0; col < map[row].length; col++) {
        if (map[row][col] === "s") {
          start = [row, col];
          break;
        }
      }
    }

    let end = null;
    for (let row = 0; row < map.length; row++) {
      for (let col = 0; col < map[row].length; col++) {
        if (map[row][col] === "e") {
          end = [row, col];
          break;
        }
      }
    }

    let path = [];
    let row = parseInt(start[0].toString());
    let col = parseInt(start[1].toString());

    // console.log("start", start);
    // console.log("end", end);

    // console.log(`row: ${row}, col: ${col}`);

    findPaths(map, path, start, row, col, end);
  }

  let paths = [];

  function findPaths(map, path, start, row, col, end) {
    let coveredBlocks = [];

    // check adjacent cells for the end
    try {
      if (map[row][col + 1] === "e") {
        col += 1;
      } else if (map[row][col - 1] === "e") {
        col -= 1;
      } else if (map[row + 1][col] === "e") {
        row += 1;
      } else if (map[row - 1][col] === "e") {
        row -= 1;
      } else if (map[row + 1][col + 1] === "e") {
        row += 1;
        col += 1;
      } else if (map[row - 1][col - 1] === "e") {
        row -= 1;
        col -= 1;
      } else if (map[row + 1][col - 1] === "e") {
        row += 1;
        col -= 1;
      } else if (map[row - 1][col + 1] === "e") {
        row -= 1;
        col += 1;
      }
    } catch (error) {
      // handle exception
    }

    // check win
    if (row === end[0] && col === end[1]) {
      paths.push(path);
      return;
    }

    // import covered blocks from path
    var tracingrow = start[0];
    var tracingcol = start[1];
    for (let i = 0; i < path.length; i++) {
      if (path[i] === "down") {
        tracingrow += 1;
        coveredBlocks.push(`${tracingrow},${tracingcol}`);
      } else if (path[i] === "up") {
        tracingrow -= 1;
        coveredBlocks.push(`${tracingrow},${tracingcol}`);
      } else if (path[i] === "right") {
        tracingcol += 1;
        coveredBlocks.push(`${tracingrow},${tracingcol}`);
      } else if (path[i] === "left") {
        tracingcol -= 1;
        coveredBlocks.push(`${tracingrow},${tracingcol}`);
      } else if (path[i] === "down-right") {
        tracingrow += 1;
        tracingcol += 1;
        coveredBlocks.push(`${tracingrow},${tracingcol}`);
      } else if (path[i] === "up-left") {
        tracingrow -= 1;
        tracingcol -= 1;
        coveredBlocks.push(`${tracingrow},${tracingcol}`);
      } else if (path[i] === "down-left") {
        tracingrow += 1;
        tracingcol -= 1;
        coveredBlocks.push(`${tracingrow},${tracingcol}`);
      } else if (path[i] === "up-right") {
        tracingrow -= 1;
        tracingcol += 1;
        coveredBlocks.push(`${tracingrow},${tracingcol}`);
      }
    }

    let possiblePaths = [];

    function checkDeadEnd(row, col) {
      if (
        (map.length - 1 >= row + 1 &&
          map[row + 1][col] === " " &&
          !coveredBlocks.includes([row + 1, col].join(","))) ||
        (0 <= row - 1 &&
          map[row - 1][col] === " " &&
          !coveredBlocks.includes([row - 1, col].join(","))) ||
        (0 <= col - 1 &&
          map[row][col - 1] === " " &&
          !coveredBlocks.includes([row, col - 1].join(","))) ||
        (map[row].length - 1 >= col + 1 &&
          map[row][col + 1] === " " &&
          !coveredBlocks.includes([row, col + 1].join(","))) ||
        (map.length - 1 >= row + 1 &&
          map[row].length - 1 >= col + 1 &&
          map[row + 1][col + 1] === " " &&
          !coveredBlocks.includes([row + 1, col + 1].join(","))) ||
        (0 <= row - 1 &&
          0 <= col - 1 &&
          map[row - 1][col - 1] === " " &&
          !coveredBlocks.includes([row - 1, col - 1].join(","))) ||
        (map.length - 1 >= row + 1 &&
          0 <= col - 1 &&
          map[row + 1][col - 1] === " " &&
          !coveredBlocks.includes([row + 1, col - 1].join(","))) ||
        (0 <= row - 1 &&
          map[row].length - 1 >= col + 1 &&
          map[row - 1][col + 1] === " " &&
          !coveredBlocks.includes([row - 1, col + 1].join(",")))
      ) {
        return false;
      } else {
        return true;
      }
    }

    if (
      row < end[0] &&
      col < end[1] &&
      map.length >= row + 1 &&
      map[row].length >= col + 1 &&
      map[row + 1][col + 1] === " " &&
      !coveredBlocks.includes([row + 1, col + 1].join(",")) 
    ) {
      let newpath = [...path];
      newpath.push("down-right");
      possiblePaths.push([newpath, row + 1, col + 1]);
    }
    if (
      row > end[0] &&
      col > end[1] &&
      map.length >= row - 1 &&
      map[row].length >= col - 1 &&
      map[row - 1][col - 1] === " " &&
      !coveredBlocks.includes([row - 1, col - 1].join(","))
    ) {
      let newpath = [...path];
      newpath.push("up-left");
      possiblePaths.push([newpath, row - 1, col - 1]);
    } 
    if (
      row < end[0] &&
      col > end[1] &&
      map.length >= row + 1 &&
      map[row].length >= col - 1 &&
      map[row + 1][col - 1] === " " &&
      !coveredBlocks.includes([row + 1, col - 1].join(","))
    ) {
      let newpath = [...path];
      newpath.push("down-left");
      possiblePaths.push([newpath, row + 1, col - 1]);
    }
    if (
      row > end[0] &&
      col < end[1] &&
      map.length >= row - 1 &&
      map[row].length >= col + 1 &&
      map[row - 1][col + 1] === " " &&
      !coveredBlocks.includes([row - 1, col + 1].join(","))
    ) {
      let newpath = [...path];
      newpath.push("up-right");
      possiblePaths.push([newpath, row - 1, col + 1]);
    }
    if (
      row < end[0] &&
      map.length >= row + 1 &&
      map[row + 1][col] === " " &&
      !coveredBlocks.includes([row + 1, col].join(","))
    ) {
      let newpath = [...path];
      newpath.push("down");
      possiblePaths.push([newpath, row + 1, col]);
    }
    if (
      row > end[0] &&
      map.length >= row - 1 &&
      map[row - 1][col] === " " &&
      !coveredBlocks.includes([row - 1, col].join(","))
    ) {
      let newpath = [...path];
      newpath.push("up");
      possiblePaths.push([newpath, row - 1, col]);
    }
    if (
      col < end[1] &&
      map[row].length >= col + 1 &&
      map[row][col + 1] === " " &&
      !coveredBlocks.includes([row, col + 1].join(","))
    ) {
      let newpath = [...path];
      newpath.push("right");
      possiblePaths.push([newpath, row, col + 1]);
    }
    if (
      col > end[1] &&
      map[row].length >= col - 1 &&
      map[row][col - 1] === " " &&
      !coveredBlocks.includes([row, col - 1].join(","))
    ) {
      let newpath = [...path];
      newpath.push("left");
      possiblePaths.push([newpath, row, col - 1]);
    }

    possiblePaths.map((path) => {
      if (checkDeadEnd(path[1], path[2])) {
        possiblePaths.splice(possiblePaths.indexOf(path), 1);
      }
    });

    if (possiblePaths.length === 0) {
      // calculate x and y distance from end for all adjacent cells
      let distances = [];
      if (
        map.length - 1 >= row + 1 &&
        map[row + 1][col] === " " &&
        !coveredBlocks.includes([row + 1, col].join(","))
      ) {
        distances.push([
          Math.abs(row + 1 - end[0]),
          Math.abs(col - end[1]),
          [row + 1, col, "down"],
        ]);
      }
      if (
        0 <= row - 1 &&
        map[row - 1][col] === " " &&
        !coveredBlocks.includes([row - 1, col].join(","))
      ) {
        distances.push([
          Math.abs(row - 1 - end[0]),
          Math.abs(col - end[1]),
          [row - 1, col, "up"],
        ]);
      }
      if (
        0 <= col - 1 &&
        map[row][col - 1] === " " &&
        !coveredBlocks.includes([row, col - 1].join(","))
      ) {
        distances.push([
          Math.abs(row - end[0]),
          Math.abs(col - 1 - end[1]),
          [row, col - 1, "left"],
        ]);
      }
      if (
        map[row].length - 1 >= col + 1 &&
        map[row][col + 1] === " " &&
        !coveredBlocks.includes([row, col + 1].join(","))
      ) {
        distances.push([
          Math.abs(row - end[0]),
          Math.abs(col + 1 - end[1]),
          [row, col + 1, "right"],
        ]);
      }
      if (
        map.length - 1 >= row + 1 &&
        map[row].length - 1 >= col + 1 &&
        map[row + 1][col + 1] === " " &&
        !coveredBlocks.includes([row + 1, col + 1].join(","))
      ) {
        distances.push([
          Math.abs(row + 1 - end[0]),
          Math.abs(col + 1 - end[1]),
          [row + 1, col + 1, "down-right"],
        ]);
      }
      if (
        0 <= row - 1 &&
        0 <= col - 1 &&
        map[row - 1][col - 1] === " " &&
        !coveredBlocks.includes([row - 1, col - 1].join(","))
      ) {
        distances.push([
          Math.abs(row - 1 - end[0]),
          Math.abs(col - 1 - end[1]),
          [row - 1, col - 1, "up-left"],
        ]);
      }
      if (
        map.length - 1 >= row + 1 &&
        0 <= col - 1 &&
        map[row + 1][col - 1] === " " &&
        !coveredBlocks.includes([row + 1, col - 1].join(","))
      ) {
        distances.push([
          Math.abs(row + 1 - end[0]),
          Math.abs(col - 1 - end[1]),
          [row + 1, col - 1, "down-left"],
        ]);
      }
      if (
        0 <= row - 1 &&
        map[row].length - 1 >= col + 1 &&
        map[row - 1][col + 1] === " " &&
        !coveredBlocks.includes([row - 1, col + 1].join(","))
      ) {
        distances.push([
          Math.abs(row - 1 - end[0]),
          Math.abs(col + 1 - end[1]),
          [row - 1, col + 1, "up-right"],
        ]);
      }

      // find the shortest distance
      if (distances.length === 0) {
        return;
      }

      let finalValues = [];
      for (let i = 0; i < distances.length; i++) {
        finalValues.push([distances[i][0] / distances[i][1], distances[i][2]]);
      }

      if (finalValues.length > 0) finalValues.sort((a, b) => a[0] - b[0]);
      let shortestDistance = finalValues;

      let newpath = [...path];
      newpath.push(shortestDistance[0][1][2]);
      possiblePaths.push([
        newpath,
        shortestDistance[0][1][0],
        shortestDistance[0][1][1],
      ]);
    }

    // if there are multiple paths, check which one is the shortest
    // console.log(possiblePaths);
    for (let i = 0; i < possiblePaths.length; i++) {
      findPaths(
        map,
        possiblePaths[i][0],
        start,
        possiblePaths[i][1],
        possiblePaths[i][2],
        end
      );
    }

    // check win
    if (row === end[0] && col === end[1]) {
      paths.push(path);
    }
  }

  find_path(map);
  paths.sort((a, b) => a.length - b.length);
  if (paths[0]){
  paths[0].map((path , i) => {
    if (path === "down" && paths[0][i + 1] === "right") {
      paths[0].splice(i, 2, "down-right");
    }
    if (path === "down" && paths[0][i + 1] === "left") {
      paths[0].splice(i, 2, "down-left");
    }
    if (path === "up" && paths[0][i + 1] === "right") {
      paths[0].splice(i, 2, "up-right");
    }
    if (path === "up" && paths[0][i + 1] === "left") {
      paths[0].splice(i, 2, "up-left");
    }
  })
  }
  return paths[0];
}

module.exports = finalFunc;

function microRender(map, sol) {
  const nmap = [...map];
  var start = null;
  for (let row = 0; row < nmap.length; row++) {
    nmap[row] = [...nmap[row]];
    for (let col = 0; col < nmap[row].length; col++) {
      if (nmap[row][col] === "s") {
        start = [row, col];
      }
    }
  }

  var row = start[0];
  var col = start[1];

  for (let i = 0; i < sol.length; i++) {
    if (sol[i] === "down") {
      row += 1;
      nmap[row][col] = "🔽";
    } else if (sol[i] === "up") {
      row -= 1;
      nmap[row][col] = "🔼";
    } else if (sol[i] === "right") {
      col += 1;
      nmap[row][col] = "▶ ";
    } else if (sol[i] === "left") {
      col -= 1;
      nmap[row][col] = " ◀";
    } else if (sol[i] === "down-right") {
      row += 1;
      col += 1;
      nmap[row][col] = "↘";
    } else if (sol[i] === "up-left") {
      row -= 1;
      col -= 1;
      nmap[row][col] = "↖";
    } else if (sol[i] === "down-left") {
      row += 1;
      col -= 1;
      nmap[row][col] = "↙";
    } else if (sol[i] === "up-right") {
      row -= 1;
      col += 1;
      nmap[row][col] = "↗";
    }
  }

  for (let row = 0; row < nmap.length; row++) {
    for (let col = 0; col < nmap[row].length; col++) {
      if (nmap[row][col] === "1") {
        nmap[row][col] = "⬛";
      } else if (nmap[row][col] === " ") {
        nmap[row][col] = "  ";
      }
    }
  }

  console.log("-".repeat(16));
  for (let row = 0; row < nmap.length; row++) {
    console.log(nmap[row].join(""));
  }
}
