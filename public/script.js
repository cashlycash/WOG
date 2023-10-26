var mouseDown = false;
document.body.onmousedown = function() { 
  mouseDown = true
}
document.body.onmouseup = function() {
  mouseDown = false
}

for (div of document.getElementsByTagName("div")) {
  div.addEventListener("mouseover", function (e) {
    if (mouseDown) {
      handleClick(e)
    }
  });
  div.addEventListener("click", function (e) {
    handleClick(e)
  });
}

var mode = "obsticles"

function handleClick(e) {
  if (mode == "obsticles") {
    e.target.classList.toggle("active")
  } else if (mode == "start") {
    for (div of document.getElementsByTagName("div")) {
      div.classList.remove("start")
    }
    e.target.classList.toggle("start")
    mode = "obsticles"
  } else if (mode == "end") {
    for (div of document.getElementsByTagName("div")) {
      div.classList.remove("end")
    }
    e.target.classList.toggle("end")
    mode = "obsticles"
  }
}

function setStart() {
  alert("Click on a square to set it as the start")
  mode = "start"
}

function setEnd() {
  alert("Click on a square to set it as the end")
  mode = "end"
}

function clearBoard() {
  for (div of document.getElementsByTagName("div")) {
    div.classList.remove("active")
    div.classList.remove("rasta")
    div.classList.remove("start")
    div.classList.remove("end")
  }
}

async function solve() {
  var start = document.getElementsByClassName("start")[0]
  var end = document.getElementsByClassName("end")[0]
  if (start == undefined) {
    alert("No start point set")
    return
  }
  if (end == undefined) {
    alert("No end point set")
    return
  }
  var grid = []
  for (div of document.getElementsByTagName("div")) {
    if (div.classList.contains("active")) {
      grid.push("1")
    } else if (div.classList.contains("start")) {
      grid.push("s")
    } else if (div.classList.contains("end")) {
      grid.push("e")
    }else {
      grid.push(" ")
    }
  }
  console.log(grid)
  var path = await (await fetch("/solve", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      grid: grid
    })
  })).json()
  console.log(path)
  if (path.length == 0) {
    alert("No path found")
  } else {
    var fin = []
    path.forEach((ary) => {
      ary.forEach(element => {
        fin.push(element)
      });
    });
    for (i = 0; i < fin.length; i++) {
      var div = document.getElementsByTagName("div")[i]
      div.classList.remove("rasta")
      div.classList.remove("active")
      div.classList.remove("start")
      div.classList.remove("end")
      div.classList.toggle(fin[i])
    }
  }
}