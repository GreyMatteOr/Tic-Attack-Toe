var game = new Game();

var gameBoard = document.querySelector('#game-board');
var nextPlayerIcon = document.querySelector('h1 img')

gameBoard.addEventListener('click', doIfTile);

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
  tile.classList.toggle(game.currentPlayer.colorClass);
  game.switchCurrentPlayer();
  nextPlayerIcon.src = game.currentPlayer.icon
}
