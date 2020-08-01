var players ={
  'Ruby Player': {
    name: 'Ruby Player',
    wins: 0
  },
  'JS Player': {
    name: 'JS Player',
    wins: 0
  }
};
var game;

var gameBoard = document.querySelector('#game-board');
var nextPlayerIcon = document.querySelector('h1 img');
var playerNames = document.querySelectorAll('.div-player-score h2');
var forfeitButton = document.querySelector('.forfeit');
var clearButton = document.querySelector('.clear')
var kablam = document.querySelector('#kablam');
var exclaim = document.querySelector('#exclaim-win');
var overlay = document.querySelector('.overlay');

window.onload = function doOnLoad(){
  players = JSON.parse( localStorage.getItem('players') ) || players;
  clearBoard();
  updatePlayerWins();
}
window.beforeunload = forfeit;
gameBoard.addEventListener('click', ifTileAttemptTurn);
forfeitButton.addEventListener('click', forfeit);


function clearBoard(){
  game = new Game(players['Ruby Player'], players['JS Player']);
  nextPlayerIcon.src = game.currentPlayer.icon;
  var tiles = document.querySelectorAll('.tile');
  tiles.forEach(function insertEmptyIcon(tile) {
    tile.src = './assets/empty.png';
    tile.classList.add('empty');
    tile.classList.remove('js-bg', 'ruby-bg');
  });
  setActiveButtons();
}

function ifTileAttemptTurn(event) {
  var tile = event.target.closest('.tile');
  if (tile) {
    ifEmptyThenFill(tile);
  }
}

function ifEmptyThenFill(tile) {
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
    addPlayerWin();
    winAnimation();
    window.setTimeout(winAnimationReset, 2400);
  } else if (game.turns >= 9) {
    tieAnimation();
    window.setTimeout(tieAnimationReset, 1200);
  } else {
    getNextPlayer();
    setActiveButtons();
  }
}

function addPlayerWin(){
  forfeitButton.disabled = true;
  game.currentPlayer.wins++;
  players[game.currentPlayer.name] = game.currentPlayer.importantData();
  localStorage.setItem('players', JSON.stringify(players));
}

function forfeit(){
  game.switchCurrentPlayer();
  addPlayerWin();
  clearBoard();
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
  exclaim.classList.remove('show-exclaim');
}

function winAnimationReset(){
  clearBoard();
  updatePlayerWins();
  kablam.classList.remove('show-kablam');
  overlay.classList.add('hidden');
}

function tieAnimation(){
  forfeitButton.disabled = true;
  exclaim.innerText = `tie.`
  exclaim.classList.remove('js-bg', 'ruby-bg', 'js-font', 'ruby-font')
  exclaim.classList.add('show-exclaim', 'draw');
}

function tieAnimationReset(){
  exclaim.classList.remove('show-exclaim', 'draw');
  clearBoard();
}

function getNextPlayer(){
  game.switchCurrentPlayer();
  nextPlayerIcon.src = game.currentPlayer.icon;
}

function setActiveButtons(){
  if(game.isEmpty()){
    forfeitButton.disabled = true;
    clearButton.disabled = false;
  } else {
    forfeitButton.disabled = false;
    clearButton.disabled = true;
  }
}

function updatePlayerWins(){
  playerNames[0].innerText = `${game.player1.name} wins: ${game.player1.wins}`;
  playerNames[1].innerText = `${game.player2.name} wins: ${game.player2.wins}`;
}
