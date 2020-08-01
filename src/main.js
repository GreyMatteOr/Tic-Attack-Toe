var game = new Game();

var gameBoard = document.querySelector('#game-board');
var nextPlayerIcon = document.querySelector('h1 img');

gameBoard.addEventListener('click', doIfTile);
window.onload = clearBoard;

function clearBoard(){
  game.newGame();
  nextPlayerIcon.src = game.currentPlayer.icon;
  var tiles = document.querySelectorAll('.tile');
  tiles.forEach(function insertEmptyIcon(tile) {
    tile.src = './assets/empty.png';
    tile.classList.add('empty');
    tile.classList.remove('ruby');
    tile.classList.remove('js');
  });
}

function doIfTile(event) {
  var tile = event.target.closest('.tile')
  if (tile) {
    checkIsEmptyThenFill(tile);
  }
}

function checkIsEmptyThenFill(tile) {
  var row = 'tmb'.indexOf(tile.id[0]);
  var col = 'lcr'.indexOf(tile.id[1]);
  if (game.tileIsEmpty([row, col])) {
    fill(tile, [row, col]);
  }
}

function fill(tile, coordinates){
  tile.src = game.currentPlayer.icon;
  tile.classList.add(game.currentPlayer.colorClass);
  tile.classList.remove('empty');
  if( game.checkForWins(coordinates) ) {
    window.setTimeout(clearBoard, 1200)
  } else if (game.turns >= 9) {
    window.setTimeout(clearBoard, 1200)
  } else {
    getNextPlayer();
  }
}

function getNextPlayer(){
  game.switchCurrentPlayer();
  nextPlayerIcon.src = game.currentPlayer.icon;
}
