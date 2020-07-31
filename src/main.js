var game = new Game();

var gameBoard = document.querySelector('#game-board');
var nextPlayerIcon = document.querySelector('h1 img');

gameBoard.addEventListener('click', doIfTile);
window.onload = clearBoard;

function clearBoard(){
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
  var column = 'lcr'.indexOf(tile.id[1]);
  if (game.tileIsEmpty(row, column)) {
    fill(tile);
  }
}

function fill(tile){
  tile.src = game.currentPlayer.icon;
  tile.classList.add(game.currentPlayer.colorClass);
  tile.classList.remove('empty')
  game.switchCurrentPlayer();
  nextPlayerIcon.src = game.currentPlayer.icon;
}
