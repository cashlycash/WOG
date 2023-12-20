var mouseDown = false;
document.body.onmousedown = function () {
  mouseDown = true;
};
document.body.onmouseup = function () {
  mouseDown = false;
};

var width = 16

for (div of document.getElementsByTagName("div")) {
  div.addEventListener("mouseover", function (e) {
    if (mouseDown) {
      handleClick(e);
    }
  });
  div.addEventListener("click", function (e) {
    handleClick(e);
  });
}

var mode = "obsticles";

function handleClick(e) {
  if (mode == "obsticles") {
    e.target.classList.toggle("active");
  } else if (mode == "start") {
    for (div of document.getElementsByTagName("div")) {
      div.classList.remove("start");
    }
    e.target.classList.toggle("start");
    mode = "obsticles";
  } else if (mode == "end") {
    for (div of document.getElementsByTagName("div")) {
      div.classList.remove("end");
    }
    e.target.classList.toggle("end");
    mode = "obsticles";
  }
}

function setStart() {
  alert("Click on a square to set it as the start");
  mode = "start";
}

function setEnd() {
  alert("Click on a square to set it as the end");
  mode = "end";
}

function editBoard() {
  for (div of document.getElementsByTagName("div")) {
    div.classList.remove("rasta");
  }
}

function clearBoard() {
  for (div of document.getElementsByTagName("div")) {
    div.classList.remove("active");
    div.classList.remove("rasta");
    div.classList.remove("start");
    div.classList.remove("end");
  }
}

async function solve() {
  var start = document.getElementsByClassName("start")[0];
  var end = document.getElementsByClassName("end")[0];
  if (start == undefined) {
    alert("No start point set");
    return;
  }
  if (end == undefined) {
    alert("No end point set");
    return;
  }
  var grid = [];
  for (div of document.getElementsByTagName("div")) {
    if (div.classList.contains("active")) {
      grid.push("1");
    } else if (div.classList.contains("start")) {
      grid.push("s");
    } else if (div.classList.contains("end")) {
      grid.push("e");
    } else {
      grid.push(" ");
    }
  }
  var { map, path } = await (
    await fetch("/solve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grid: grid,
        width
      }),
    })
  ).json();

  if (path == null) {
    alert("Could not find a path");
    return;
  }

  if (map.length == 0) {
  } else {
    var fin = [];
    map.forEach((ary) => {
      ary.forEach((element) => {
        fin.push(element);
      });
    });
    for (i = 0; i < fin.length; i++) {
      var div = document.getElementsByTagName("div")[i];
      div.classList.remove("rasta");
      div.classList.remove("active");
      div.classList.remove("start");
      div.classList.remove("end");
      div.classList.toggle(fin[i]);
    }

    var start = null;
    var nmap = [...map];
    for (let row = 0; row < nmap.length; row++) {
      nmap[row] = [...nmap[row]];
      for (let col = 0; col < nmap[row].length; col++) {
        if (nmap[row][col] === "start") {
          start = [row, col];
        }
      }
    }
    var row = start[0];
    var col = start[1];

    var paths = [];

    for (let i = 0; i < path.length; i++) {
      var add = true;
      if (path[i] === "down") {
        row += 1;
      } else if (path[i] === "up") {
        row -= 1;
      } else if (path[i] === "right") {
        col += 1;
      } else if (path[i] === "left") {
        col -= 1;
      } else if (path[i] === "down-right") {
        row += 1;
        col += 1;
      } else if (path[i] === "up-left") {
        row -= 1;
        col -= 1;
      } else if (path[i] === "down-left") {
        row += 1;
        col -= 1;
      } else if (path[i] === "up-right") {
        row -= 1;
        col += 1;
      } else {
        add = false
      }
      if (add) {
        paths.push([row, col]);
      }
    }

    paths.forEach((path, index) => {
      setTimeout(() => {
        var div = document.getElementsByTagName("div")[path[0] * width + path[1]];
        div.classList.add("rasta");
      }, index * 500);
    });
  }
}
