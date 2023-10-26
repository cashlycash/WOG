const findpath = require('./find.js')
const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser("100 ruppey ki pepsi, judges are sexy"))

app.get('/login', (req, res) => {
  if (req.signedCookies.user) return res.redirect('/')
  res.sendFile(__dirname + '/public/login.html')
})

app.post('/login', (req, res) => {
  if (req.signedCookies.user) return res.redirect('/')
  var username = req.body.username
  var password = req.body.password
  // console.log('username: ' + username)
  // console.log('password: ' + password)
  if (username == 'admin' && password == 'password') {
    res.cookie('user', 'admin', { signed: true })
    // console.log('cookie created successfully')
    res.redirect('/')
  } else {
    // console.log('incorrect username or password')
    res.redirect('/login')
  }
})

app.get('/logout', (req, res) => {
  res.clearCookie('user')
  res.redirect('/login')
})

app.get('/', (req, res) => {
  if (req.signedCookies.user == undefined) {
    res.redirect('/login')
    return;
  }
  res.sendFile(__dirname + '/public/main.html')
})

function renderMap(omap, path) {
  const nmap = [...omap];
  var start = null;
  for (let row = 0; row < nmap.length; row++) {
    nmap[row] = [...nmap[row]];
    for (let col = 0; col < nmap[row].length; col++) {
      if (nmap[row][col] === "s") {
        nmap[row][col] = "start"
        start = [row, col];
      }
      if (nmap[row][col] === "e") {
        nmap[row][col] = "end"
      }
      if (nmap[row][col] != "s" & nmap[row][col] != "e" & nmap[row][col] != " "){
        nmap[row][col] = "active"
      }
    }
  }

  var row = start[0];
  var col = start[1];

  for (let i = 0; i < path.length; i++) {
    if (path[i] === "down") {
      row += 1;
      nmap[row][col] = "rasta";
    } else if (path[i] === "up") {
      row -= 1;
      nmap[row][col] = "rasta";
    } else if (path[i] === "right") {
      col += 1;
      nmap[row][col] = "rasta";
    } else if (path[i] === "left") {
      col -= 1;
      nmap[row][col] = "rasta";
    } else if (path[i] === "down-right") {
      row += 1;
      col += 1;
      nmap[row][col] = "rasta";
    } else if (path[i] === "up-left") {
      row -= 1;
      col -= 1;
      nmap[row][col] = "rasta";
    } else if (path[i] === "down-left") {
      row += 1;
      col -= 1;
      nmap[row][col] = "rasta";
    } else if (path[i] === "up-right") {
      row -= 1;
      col += 1;
      nmap[row][col] = "rasta";
    }
  }
  return nmap;
}

app.get("/resources", (req, res) => {
  if (req.signedCookies.user == undefined) {
    res.redirect('/login')
    return;
  }
  res.sendFile(__dirname + '/public/resourcelist.html')
})

app.post('/solve', (req, res) => {
  if (req.signedCookies.user == undefined) {
    res.redirect('/login')
    return;
  }
  var grid = req.body.grid
  var grid = grid.reduce((result, value, index, array) => {
    const chunkIndex = Math.floor(index / 8)
    if (!result[chunkIndex]) {
      result[chunkIndex] = []
    }
    result[chunkIndex].push(value)
    return result
  }, [])

  var path = findpath(grid)
  return renderMap(grid, path)
})

app.use(express.static('public'))

app.listen(3000, () => {
  console.log('listening on port 3000')
})