function result(map) {
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
      console.log("win");
      if (paths.map((path) => path.join(",")).includes(path.join(","))) {
        return;
      }
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

    console.log(path);
    // calculate x and y distance from end for all adjacent cells
    let distances = [];
    if (
      row + 1 <= map.length - 1 &&
      map.length - 1 >= row + 1 &&
      map[row + 1][col] === " " &&
      !coveredBlocks.includes([row + 1, col].join(","))
    ) {
      distances.push([end[0], end[1], [row + 1, col, "down"]]);
    }
    if (
      row - 1 >= 0 &&
      map.length - 1 >= row - 1 &&
      map[row - 1][col] === " " &&
      !coveredBlocks.includes([row - 1, col].join(","))
    ) {
      distances.push([end[0], end[1], [row - 1, col, "up"]]);
    }
    if (
      col + 1 <= map[row].length - 1 &&
      map[row].length - 1 >= col - 1 &&
      map[row][col - 1] === " " &&
      !coveredBlocks.includes([row, col - 1].join(","))
    ) {
      distances.push([end[0], end[1], [row, col - 1, "left"]]);
    }
    if (
      col - 1 >= 0 &&
      map[row].length - 1 >= col + 1 &&
      map[row][col + 1] === " " &&
      !coveredBlocks.includes([row, col + 1].join(","))
    ) {
      distances.push([end[0], end[1], [row, col + 1, "right"]]);
    }
    if (
      col + 1 <= map[row].length - 1 &&
      row + 1 <= map.length - 1 &&
      map.length - 1 >= row + 1 &&
      map[row].length - 1 >= col + 1 &&
      map[row + 1][col + 1] === " " &&
      !coveredBlocks.includes([row + 1, col + 1].join(","))
    ) {
      distances.push([end[0], end[1], [row + 1, col + 1, "down-right"]]);
    }
    if (
      col - 1 >= 0 &&
      row - 1 >= 0 &&
      map.length - 1 >= row - 1 &&
      map[row].length - 1 >= col - 1 &&
      map[row - 1][col - 1] === " " &&
      !coveredBlocks.includes([row - 1, col - 1].join(","))
    ) {
      distances.push([end[0], end[1], [row - 1, col - 1, "up-left"]]);
    }
    if (
      col - 1 >= 0 &&
      row + 1 <= map.length - 1 &&
      map.length - 1 >= row + 1 &&
      map[row].length - 1 >= col - 1 &&
      map[row + 1][col - 1] === " " &&
      !coveredBlocks.includes([row + 1, col - 1].join(","))
    ) {
      distances.push([end[0], end[1], [row + 1, col - 1, "down-left"]]);
    }
    if (
      col + 1 <= map[row].length - 1 &&
      row - 1 >= 0 &&
      map.length - 1 >= row - 1 &&
      map[row].length - 1 >= col + 1 &&
      map[row - 1][col + 1] === " " &&
      !coveredBlocks.includes([row - 1, col + 1].join(","))
    ) {
      distances.push([end[0], end[1], [row - 1, col + 1, "up-right"]]);
    }

    // find the shortest distance
    if (distances.length === 0) {
      return;
    }

    function getShortestDistance(distances) {
      let finalValues = [];
      for (let i = 0; i < distances.length; i++) {
        var pointa = [distances[i][0], distances[i][1]];
        var pointb = [distances[i][2][0], distances[i][2][1]];
        var mutualDist = Math.sqrt(
          Math.pow(pointa[0] - pointb[0], 2) +
            Math.pow(pointa[1] - pointb[1], 2)
        );
        finalValues.push([mutualDist, distances[i][2]]);
      }
      if (finalValues.length > 0) finalValues.sort((a, b) => a[0] - b[0]);
      var shortestDistance = finalValues[0];

      // check incase shortest distance is a dead end
      var cordX = shortestDistance[1][0];
      var cordY = shortestDistance[1][1];
      const checkDedMap = [...map];

      // fill the used path with a character
      coveredBlocks.forEach((block) => {
        checkDedMap[block.split(",")[0]][block.split(",")[1]] = "x";
      });

      // check all adjacent cells for the end
      console.log(cordX, cordY);
      if (
        !(
          (map.length - 1 >= cordX + 1 && map[cordX + 1][cordY] === " ") ||
          (cordX - 1 >= 0 && map[cordX - 1][cordY] === " ") ||
          (map[cordX].length - 1 >= cordY + 1 && map[cordX][cordY + 1] === " ") ||
          (cordY - 1 >= 0 && map[cordX][cordY - 1] === " ") ||
          (map.length - 1 >= cordX + 1 &&
            map[cordX].length - 1 >= cordY + 1 &&
            map[cordX + 1][cordY + 1] === " ") ||
          (cordX - 1 >= 0 &&
            cordY - 1 >= 0 &&
            map[cordX - 1][cordY - 1] === " ") ||
          (map.length - 1 >= cordX + 1 &&
            cordY - 1 >= 0 &&
            map[cordX + 1][cordY - 1] === " ") ||
          (cordX - 1 >= 0 &&
            map[cordX].length - 1 >= cordY + 1 &&
            map[cordX - 1][cordY + 1] === " ")
        )
      ) {
        var fakeDistIndex = distances.indexOf(
          distances.find((dist) => dist[2] === shortestDistance[1])
        );
        console.log(distances.splice(fakeDistIndex, 1))
        shortestDistance = getShortestDistance(
          distances.splice(fakeDistIndex, 1)
        );
      }

      return shortestDistance;
    }

    let shortestDistance = getShortestDistance(distances);

    let newpath = [...path];
    newpath.push(shortestDistance[1][2]);
    possiblePaths.push([
      newpath,
      shortestDistance[1][0],
      shortestDistance[1][1],
    ]);

    // if there are multiple paths, check which one is the shortest
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
      if (paths.map((path) => path.join(",")).includes(path.join(","))) {
        return;
      }
      paths.push(path);
    }
  }

  find_path(map);
  paths.sort((a, b) => a.length - b.length);
  return paths[0];
}

module.exports = result;
