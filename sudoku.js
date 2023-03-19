let errors = 0;
let board;
let soultion;

fetch('https://sudoku-api.vercel.app/api/dosuku')
  .then((response) => response.json())
  .then((data) => {
    const fetchedBoardData = data.newboard.grids[0].value; // data of board is at this key of the board object
    const fetchedSolutionData = data.newboard.grids[0].solution; // solution of board is at this key of the board object
    board = fetchedBoardData;
    soultion = fetchedSolutionData;
  })
  .then(() => {
    convertToStrFunction();
    logicFunction();
  });
const boardArr = [];
const solutionArr = [];
function convertToStrFunction() {
  let i = 0;
  while (i < 9) {
    var str = board[i].toString();
    str = str.split(',').join('');
    str2 = str.split('0').join('-');
    boardArr.push(str2);
    i++;
  }
  i = 0;
  while (i < 9) {
    var str = soultion[i].toString();
    str = str.split(',').join('');
    str2 = str.split('0').join('-');
    solutionArr.push(str2);
    i++;
  }
  console.log(solutionArr);
}
//basically to convert the fetched data to the desired format from  [0012000]  to [--12000] 

let numSelected = null;
const tileSelected = null;

function convertToStrFunction() {
  if (boardArr === solutionArr) {
    document.getElementById('timers').innerHTML = 'Binggoooo you won!!';
  }

  let timers = 0;
  setInterval(() => {
    document.getElementById('timers').innerHTML = ++timers;
  }, 1000);
  if (timers == 600) {
    alert('time is up!');
    location.reload();
  }

  for (let i = 1; i <= 9; i++) {
    const number = document.createElement('div');
    number.id = i;
    number.innerText = i;
    number.addEventListener('click', selectNumber);
    number.classList.add('number');
    document.getElementById('digits').appendChild(number);
  }

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const tile = document.createElement('div');
      tile.id = `${r.toString()}-${c.toString()}`; // providing each tile's id acc to its row-column number
      if (boardArr[r][c] != '-') {
        tile.innerText = boardArr[r][c]; // basically to remove the hypen from the board I did so
        tile.classList.add('tile-start');
      } // below code is for adding horizontal lines for 3by3 blocks in the board
      if (r == 2 || r == 5) {
        tile.classList.add('horizontal-line');
      }
      if (c == 2 || c == 5) {
        tile.classList.add('vertical-line');
      }
      tile.addEventListener('click', selectTile);
      tile.classList.add('tile');
      document.getElementById('board').append(tile);
    }
  }
}

function selectNumber() {
  if (numSelected != null) {
    numSelected.classList.remove('number-selected');
  }
  numSelected = this;
  numSelected.classList.add('number-selected');
}

function selectTile() {
  if (numSelected) {
    if (this.innerText != '') {
      // so that the number dont override if clicked on tile
      return;
    }
    // "0-0" "0-1" .. "3-1"
    const coords = this.id.split('-'); // ["0", "0"]
    const r = parseInt(coords[0]);
    const c = parseInt(coords[1]);
    if (solutionArr[r][c] == numSelected.id) {
      this.innerText = numSelected.id;
    } else {
      errors += 1;
      document.getElementById('errors').innerText = errors;
      if (errors === 20) {
        alert('More than 20 errors , GAME OVER!!');
        location.reload();
      }
    }
  }
}
