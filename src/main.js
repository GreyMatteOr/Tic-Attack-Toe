var game;

var gameBoard = document.querySelector('#game-board');
var nextPlayerIcon = document.querySelector('h1 img');
var playerNames = document.querySelectorAll('.div-player-score h2');
var forfeitButton = document.querySelector('.forfeit');
var clearButton = document.querySelector('.clear');
var p1ChangeName = document.querySelector('#section-left>button');
var p2ChangeName = document.querySelector('#section-right>button');
var p1nameInput = document.querySelector('#section-left>input');
var p2nameInput = document.querySelector('#section-right>input');
var p1Anon = document.querySelector('#section-left .anonymous');
var p2Anon = document.querySelector('#section-right .anonymous');
var p1AI = document.querySelector('#section-left .AI');
var p2AI = document.querySelector('#section-right .AI');
var kablam = document.querySelector('#kablam');
var exclaim = document.querySelector('#exclaim-win');
var overlay = document.querySelector('.overlay');

window.onload = function doOnLoad() {
  clearBoard();
  updatePlayerWinsDisplay();
};

window.beforeunload = function ifGameThenForfeit() {
  if( !game.isEmpty ) {
    forfeit(false);
  }
};

gameBoard.addEventListener('click', ifTileAttemptTurn);
forfeitButton.addEventListener('click', function forfeitAndShowAnimation() {
  forfeit(true);
});
clearButton.addEventListener('click', clearScores);
p1ChangeName.addEventListener('click', toggleForm);
p2ChangeName.addEventListener('click', toggleForm);
p1nameInput.addEventListener('keydown', ifEnterAttemptChangeName);
p2nameInput.addEventListener('keydown', ifEnterAttemptChangeName);
p1Anon.addEventListener('click', becomeAnonymous);
p2Anon.addEventListener('click', becomeAnonymous);
p1AI.addEventListener('click', ifAIButtonCreateGame);
p2AI.addEventListener('click', ifAIButtonCreateGame);

function ifAIButtonCreateGame(event){
  var isLeft = event.target.closest('section').dataset.side === 'left';
  var playerType = event.target.dataset.ai;
  var nameIndex = ['ez', 'med', 'hard'].indexOf(playerType);
  var argsObj= {
    p1Name: (isLeft) ? ['Cole', 'Sylva', 'Rube Goldberg'][nameIndex] : game.p1.name,
    p2Name: (isLeft) ? game.p2.name : ['Chip', 'Mouse', 'Skynet'][nameIndex] ,
    p1Type: (isLeft) ?  playerType: 'human',
    p2Type: (isLeft) ? 'human' : playerType
  }
  startNewGame( argsObj.p1Name, argsObj.p2Name, argsObj.p1Type, argsObj.p2Type )
  refreshDisplay();
}

function toggleForm(event) {
  clearInputs();
  var isLeft = event.target.closest('section').dataset.side === 'left';
  var section = (isLeft) ? '#section-left' : '#section-right';
  var node = (isLeft) ? p1ChangeName : p2ChangeName
  var toggleText = (node.innerText === 'Change') ? 'back!' : 'Change';
  node.innerText = toggleText;
  document.querySelector(`${ section } input`).classList.toggle('hidden');
  document.querySelector(`${ section } .anonymous`).classList.toggle('hidden');
  document.querySelector(`${ section } .AI`).classList.toggle('hidden')
};

function ifEnterAttemptChangeName(event) {
  if (event.key === 'Enter'){
    var isLeft = event.target.closest('section').dataset.side === 'left';
    attempChangeName(isLeft);
  }
};

function attempChangeName(isLeft){
  var userText = ( isLeft ) ? p1nameInput.value : p2nameInput.value;
  if ( isNotTooLong(isLeft, userText ) && notCurrentlyInUse(isLeft, userText ) ) {
    changeName(userText, isLeft);
  }
}

function changeName(userText, isLeft){
  var p1Name = (isLeft) ? userText : game.p1.name;
  var p2Name = (isLeft) ? game.p2.name : userText;
  startNewGame( p1Name, p2Name );
  clearInputs();
}

function notCurrentlyInUse(isLeft, name) {
  var currentlyInUse = name.toLowerCase() === game.p1.name ||
                       name.toLowerCase() === game.p2.name;
  if (currentlyInUse) {
    flashWarning(isLeft, 'ALREADY EXISTS!');
  }
  return !currentlyInUse;
};

function isNotTooLong(isLeft, name) {
  var isTooLong = name.length > 20
  if (isTooLong) {
    flashWarning(isLeft, 'TOO LONG');
  }
  return !isTooLong;
};

function flashWarning(isLeft, warningText){
  var warningNode = document.querySelector(`${(isLeft) ? '#section-left' : '#section-right'} .invisible`)
  warningNode.innerText = warningText;
  warningNode.classList.add('show-exclaim', 'draw');
  window.setTimeout( function warningReset(){
    warningNode.classList.remove('show-exclaim', 'draw');
  }, 1200);
}

function clearInputs() {
  p1nameInput.value = '';
  p2nameInput.value = '';
};

function becomeAnonymous(event) {
  var isLeft = event.target.closest('section').dataset.side === 'left';
  var names = (isLeft) ? [ 'Ruby Player', game.p2.name ] : [ game.p1.name, 'JS Player' ];
  startNewGame( names[0], names[1] );
  toggleForm(event);
};

function startNewGame(p1Name, p2Name, p1Type, p2Type) {
  var name1 = p1Name || ( (game) ? game.p1.name : 'Ruby Player' );
  var name2 = p2Name || ( (game) ? game.p2.name : 'JS Player' );
  game = new Game( name1, name2, p1Type, p2Type );
  nextPlayerIcon.src = game.currentPlayer.icon;
  updatePlayerWinsDisplay();
};

function clearBoard() {
  startNewGame();
  refreshDisplay();
  setButtonStatus();
};

function ifTileAttemptTurn(event) {
  var tile = event.target.closest('.tile');
  if (tile) {
    ifEmptyThenFill(tile);
  }
};

function ifEmptyThenFill(tile) {
  var row = 'tmb'.indexOf(tile.id[0]);
  var col = 'lcr'.indexOf(tile.id[1]);
  if ( game.tileIsEmpty( [row, col] ) ) {
    fill(tile, game.currentPlayer);
    game.takeTurn( [row, col] );
    checkGameOver( [row, col] );
  }
};

function refreshDisplay(){
  var tiles = document.querySelectorAll('.tile');
  tiles.forEach(function insertEmptyIcon(tile) {
    var row = 'tmb'.indexOf(tile.id[0]);
    var col = 'lcr'.indexOf(tile.id[1]);
    if(game.board[row][col] === ''){
      empty(tile);
    } else {
      var player = (game.p1.symbol === game.board[row][col]) ? game.p1 : game.p2;
      fill(tile, player)
    }
  });
}

function empty(tile){
  tile.src = './assets/empty.png';
  tile.classList.add('empty');
  tile.classList.remove('js-bg', 'ruby-bg');
}

function fill(tile, player) {
  tile.src = player.icon;
  tile.classList.add(player.colorClass);
  tile.classList.remove('empty');
};

function checkGameOver( coordinates ) {
  if( game.checkForWins(coordinates) ) {
    addPlayerWin();
    winAnimation(game.currentPlayer);
  } else if (game.turns >= 9) {
    game.giveTie();
    tieAnimation();
  } else {
    getNextPlayer();
    setButtonStatus();
  }
};

function addPlayerWin() {
  game.giveWin();
  updatePlayerWinsDisplay();
};

function forfeit(showAnimation) {
  game.switchCurrentPlayer();
  addPlayerWin();
  if (showAnimation) {
    winAnimation(game.currentPlayer);
    window.setTimeout(winAnimationReset, 2400);
  }
  clearBoard();
};

function clearScores() {
  for (var player of [game.p1, game.p2] ) {
    player.eraseWins();
  };
  updatePlayerWinsDisplay();
};

function winAnimation(winner) {
  forfeitButton.disabled = true;
  kablam.classList.remove('fade'), kablam.classList.add('show-kablam');
  exclaim.classList.remove('js-bg', 'ruby-bg', 'js-font', 'ruby-font');
  overlay.classList.remove('hidden');
  window.setTimeout(function stage1() { winAnimationStage1(winner) }, 600);
  window.setTimeout(winAnimationStage2, 1800);
  window.setTimeout(winAnimationReset, 2400);
};

function winAnimationStage1(winner) {
  exclaim.innerText = `${winner.name} wins!!`;
  exclaim.classList.add('show-exclaim');
  exclaim.classList.add(winner.bgClass, winner.fontClass);
};

function winAnimationStage2() {
  kablam.classList.add('fade');
  exclaim.classList.remove('show-exclaim');
};

function winAnimationReset() {
  clearBoard();
  kablam.classList.remove('show-kablam');
  overlay.classList.add('hidden');
};

function tieAnimation() {
  forfeitButton.disabled = true;
  exclaim.innerText = `tie.`;
  exclaim.classList.remove('js-bg', 'ruby-bg', 'js-font', 'ruby-font');
  exclaim.classList.add('show-exclaim', 'draw');
  window.setTimeout(tieAnimationReset, 1200);
};

function tieAnimationReset() {
  exclaim.classList.remove('show-exclaim', 'draw');
  clearBoard();
};

function getNextPlayer() {
  game.switchCurrentPlayer();
  nextPlayerIcon.src = game.currentPlayer.icon;
};

function setButtonStatus() {
  var gameIsEmpty = game.isEmpty();
  forfeitButton.disabled = gameIsEmpty;
  clearButton.disabled = !gameIsEmpty;
  p1ChangeName.disabled = !gameIsEmpty, p1ChangeName.innerText = 'Change';
  p2ChangeName.disabled = !gameIsEmpty, p2ChangeName.innerText = 'Change';
  for ( var node of document.querySelectorAll('.if-game-dont-show') ) {
    node.classList.add('hidden');
  }
};

function updatePlayerWinsDisplay() {
  var doNotShowScoreP1 = (game.p1.name === 'ruby player' || game.p1.name === 'js player');
  var doNotShowScoreP2 = (game.p2.name === 'ruby player' || game.p2.name === 'js player');
  p1 = `${game.p1.name}${ (doNotShowScoreP1) ? `` : ` wins: ${game.p1.wins}` }`;
  p2 = `${game.p2.name}${ (doNotShowScoreP2) ? `` : ` wins: ${game.p2.wins}` }`;
  playerNames[0].innerText = p1;
  playerNames[1].innerText = p2;
};
