var game = new Game();

var gameBoard = document.querySelector('#game-board');
var nextPlayerIcon = document.querySelector('h1 img');
var playerNames = document.querySelectorAll('.div-player-score h2');
var kablam = document.querySelector('#kablam');
var exclaim = document.querySelector('#exclaim-win');
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
    tile.classList.remove('ruby-bg');
    tile.classList.remove('js-bg');
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
    game.currentPlayer.wins++;
    winAnimation();
    window.setTimeout(winAnimationclear, 2400);
  } else if (game.turns >= 9) {
    tieAnimation();
    window.setTimeout(tieAnimationClear, 1200);
  } else {
    getNextPlayer();
  }
}

function winAnimation(){
  kablam.classList.remove('fade'), kablam.classList.add('show-kablam');
  exclaim.classList.remove('js-bg', 'ruby-bg', 'js-font', 'ruby-font')
  overlay.classList.remove('hidden');
  window.setTimeout(winAnimationStage1, 600);
  window.setTimeout(winAnimationStage2, 1800);
}

function winAnimationStage1(){
  exclaim.innerText = `${game.currentPlayer.name} wins!!`
  exclaim.classList.add('show-exclaim');
  exclaim.classList.add(game.currentPlayer.bgClass, game.currentPlayer.fontClass);
}

function winAnimationStage2(){
  kablam.classList.add('fade');
  // exclaim.classList.add('fade');
  exclaim.classList.remove('show-exclaim');

}

function winAnimationclear(){
  clearBoard();
  updatePlayerWins();
  kablam.classList.remove('show-kablam');
  overlay.classList.add('hidden');
}

function tieAnimation(){
  exclaim.innerText = `tie.`
  exclaim.classList.remove('js-bg', 'ruby-bg', 'js-font', 'ruby-font')
  exclaim.classList.add('show-exclaim', 'draw');
}

function tieAnimationClear(){
  exclaim.classList.remove('show-exclaim', 'draw');
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
