var game = new Game();

var gameBoard = document.querySelector('#game-board');

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
    game.switchCurrentPlayer();
  }
}

function fill(tile){
  tile.src = game.currentPlayer.icon;
  tile.classList.toggle(game.currentPlayer.colorClass);
}
