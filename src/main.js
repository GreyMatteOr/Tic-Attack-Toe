var game = new Game();

var gameBoard = document.querySelector('#game-board');
var nextPlayerIcon = document.querySelector('h1 img');
var playerNames = document.querySelectorAll('.div-player-score h2');
var kablam = document.querySelector('.invisible');
var overlay = document.querySelector('.overlay')

gameBoard.addEventListener('click', doIfTile);
window.onload = function doOnLoad(){
  clearBoard();
  updatePlayerWins();
}

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
  var tile = event.target.closest('.tile');
  if (tile) {
    checkIsEmptyThenFill(tile);
  }
}

function checkIsEmptyThenFill(tile) {
  var row = 'tmb'.indexOf(tile.id[0]);
  var col = 'lcr'.indexOf(tile.id[1]);
  if ( game.tileIsEmpty( [row, col] ) ) {
    fill(tile);
    checkGameOver( [row, col] );
  }
}

function fill(tile){
  tile.src = game.currentPlayer.icon;
  tile.classList.add(game.currentPlayer.colorClass);
  tile.classList.remove('empty');
}

function checkGameOver( coordinates ){
  if( game.checkForWins(coordinates) ) {
    kablam.classList.toggle('kablam');
    overlay.classList.toggle('hidden');
    window.setTimeout(waitThenDoWin, 1200);
  } else if (game.turns >= 9) {
    window.setTimeout(waitThenDoTie, 1200);
  } else {
    getNextPlayer();
  }
}

function waitThenDoWin(){
  clearBoard();
  updatePlayerWins();
  kablam.classList.toggle('kablam');
  overlay.classList.toggle('hidden')
}

function waitThenDoTie(){
  
  clearBoard();
}

function getNextPlayer(){
  game.switchCurrentPlayer();
  nextPlayerIcon.src = game.currentPlayer.icon;
}

function updatePlayerWins(){
  playerNames[0].innerText = `${game.player1.name} wins: ${game.player1.wins}`;
  playerNames[1].innerText = `${game.player2.name} wins: ${game.player2.wins}`;
}
