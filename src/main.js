var game;

var gameBoard = document.querySelector('#game-board');
var nextPlayerIcon = document.querySelector('h1 img');
var playerNames = document.querySelectorAll('.div-player-score h2');
var forfeitButton = document.querySelector('.forfeit');
var clearButton = document.querySelector('.clear');
var p1ChangeName = document.querySelector('#section-left>button');
var p2ChangeName = document.querySelector('#section-right>button');
var p1NameInput = document.querySelector('#section-left input');
var p2NameInput = document.querySelector('#section-right input');
var p1SubmitName = document.querySelector('#section-left>.input-flex>button');
var p2SubmitName = document.querySelector('#section-right>.input-flex>button')
var p1Anon = document.querySelector('#section-left .anonymous');
var p2Anon = document.querySelector('#section-right .anonymous');
var p1AI = document.querySelector('#section-left .AI');
var p2AI = document.querySelector('#section-right .AI');
var p1AIStop = document.querySelector('#section-left .stop')
var p2AIStop = document.querySelector('#section-right .stop')
var p1Step = document.querySelector('#section-left .step')
var p2Step = document.querySelector('#section-right .step')
var kablam = document.querySelector('#kablam');
var exclaim = document.querySelector('#exclaim-win');
var overlay = document.querySelector('.overlay');

window.onload = function doOnLoad() {
  clearBoard();
  updatePlayerWinsDisplay();
};

window.beforeunload = function ifGameThenForfeit() {
  if( game.hasStarted ) {
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
p1NameInput.addEventListener('keydown', ifEnterAttemptChangeName);
p2NameInput.addEventListener('keydown', ifEnterAttemptChangeName);
p1Anon.addEventListener('click', becomeAnonymous);
p2Anon.addEventListener('click', becomeAnonymous);
p1AI.addEventListener('click', ifAIButtonCreateGame);
p2AI.addEventListener('click', ifAIButtonCreateGame);
p1AIStop.addEventListener('click', toggleAutoAI);
p2AIStop.addEventListener('click', toggleAutoAI);
p1Step.addEventListener('click', takeAITurn);
p2Step.addEventListener('click', takeAITurn);
p1SubmitName.addEventListener('click', tryName);
p2SubmitName.addEventListener('click', tryName);

function tryName(event){
  var isLeft = event.target.closest('section').dataset.side === 'left';
  attempChangeName(isLeft, event);
}

function toggleAutoAI(){
  var isLeft = event.target.closest('section').dataset.side === 'left';
  ( (isLeft) ? game.p1 : game.p2 ).toggleAutoRun();
  event.target.innerText = ( event.target.innerText === 'manual' ) ? 'run=auto' : 'manual';
  tryAITurnLoop();
}

function ifAIButtonCreateGame(event){
  var isLeft = event.target.closest('section').dataset.side === 'left';
  var type = event.target.dataset.ai;
  var nameIndex = ['ez', 'med', 'hard'].indexOf(type);
  var argsObj= {
    p1Name: (isLeft) ? ['Cole', 'Sylva', 'Rube Goldberg'][nameIndex] : game.p1.name,
    p2Name: (isLeft) ? game.p2.name : ['Chip', 'Mouse', 'Skynet'][nameIndex] ,
    p1Type: (isLeft) ?  type: game.p1.type,
    p2Type: (isLeft) ? game.p2.type : type
  }
  startNewGame( argsObj.p1Name, argsObj.p2Name, argsObj.p1Type, argsObj.p2Type );
}

function toggleForm(event) {
  clearInputs();
  var isLeft = event.target.closest('section').dataset.side === 'left';
  var section = (isLeft) ? '#section-left' : '#section-right';
  var node = (isLeft) ? p1ChangeName : p2ChangeName
  var toggleText = (node.innerText === 'Change') ? 'hide' : 'Change';
  node.innerText = toggleText;
  document.querySelector(`${ section } .input-flex`).classList.toggle('hidden');
  document.querySelector(`${ section } .anonymous`).classList.toggle('hidden');
  document.querySelector(`${ section } .AI`).classList.toggle('hidden')
};

function ifEnterAttemptChangeName(event) {
  if (event.key === 'Enter'){
    tryName(event);
  }
};

function attempChangeName(isLeft, event){
  var userText = ( isLeft ) ? p1NameInput.value : p2NameInput.value;
  if ( isNotTooLong(isLeft, userText ) && notCurrentlyInUse(isLeft, userText ) ) {
    changeName(userText, isLeft, event);
  }
}

function changeName(userText, isLeft, event){
  game.p1.name = (isLeft) ? userText : game.p1.name;
  game.p2.name = (isLeft) ? game.p2.name : userText;
  updatePlayerWinsDisplay();
  toggleForm(event);
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
  p1NameInput.value = '';
  p2NameInput.value = '';
};

function becomeAnonymous(event) {
  var isLeft = event.target.closest('section').dataset.side === 'left';
  var names = (isLeft) ? [ 'Ruby Player', game.p2.name ] : [ game.p1.name, 'JS Player' ];
  startNewGame( names[0], names[1], 'human', 'human' );
};

function startNewGame(p1Name, p2Name, p1Type, p2Type) {
  var p1Obj = {
     name : p1Name || ( (game) ? game.p1.name : 'Ruby Player' ),
     type : p1Type || ( (game) ? game.p1.type : 'human' ),
     autoRun : (game) ? game.p1.autoRun : true
   }
  var p2Obj = {
    name : p2Name || ( (game) ? game.p2.name : 'JS Player' ),
    type : p2Type || ( (game) ? game.p2.type : 'human' ),
    autoRun : (game) ? game.p2.autoRun : true
  }
  game = new Game( p1Obj, p2Obj);
  nextPlayerIcon.src = game.currentPlayer.icon;
  updatePlayerWinsDisplay();
  tryAITurnLoop()
};

function tryAITurnLoop() {
  if( ( game.currentPlayer.isAutoAI() )) {
    takeAITurn();
  }
  setButtonStatus();
}

function takeAITurn(){
  if(game.currentPlayer.type !== 'human'){
    var behavior = {
      'ez': 'randomOpenTile',
      'med': 'winOrRandom',
      'hard': 'winOrCornerStratOrTie'
    }
    var coordinates = game[ behavior[game.currentPlayer.type] ]();
  }
  game.takeTurn( coordinates );
  refreshDisplay();
  checkGameOver( coordinates );
}

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
    if(game.getSymbol( [row, col] ) === ''){
      empty(tile);
    } else {
      var player = (game.p1.symbol === game.getSymbol( [row, col] ) ) ? game.p1 : game.p2;
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
    tryAITurnLoop();
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
  var gameHasStarted = game.hasStarted();
  forfeitButton.disabled = !gameHasStarted;
  clearButton.disabled = gameHasStarted;
  p1ChangeName.disabled = gameHasStarted, p1ChangeName.innerText = 'Change';
  p2ChangeName.disabled = gameHasStarted, p2ChangeName.innerText = 'Change';
  for ( var node of document.querySelectorAll('.if-game-dont-show') ) {
    node.classList.add('hidden');
  }
  ifNotHumanDisplayStop()
};

function ifNotHumanDisplayStop(){
  p1AIStop.innerText = (game.p1.autoRun) ? 'run=auto' : 'manual';
  p1AIStop.classList[ (game.p1.type === 'human') ? 'add' : 'remove' ]( 'hidden' );
  p2AIStop.innerText = (game.p2.autoRun) ? 'run=auto' : 'manual';
  p2AIStop.classList[ (game.p2.type === 'human') ? 'add' : 'remove' ]( 'hidden' );
  ifNotAutoDisplayStep();
}

function ifNotAutoDisplayStep() {
  p1Step.classList[ (game.p1.autoRun || game.p1.type === 'human') ? 'add' : 'remove' ]( 'hidden' );
  p2Step.classList[ (game.p2.autoRun || game.p2.type === 'human' ) ? 'add' : 'remove' ]( 'hidden' );
}

function updatePlayerWinsDisplay() {
  var doNotShowScoreP1 = (game.p1.name === 'ruby player' || game.p1.name === 'js player');
  var doNotShowScoreP2 = (game.p2.name === 'ruby player' || game.p2.name === 'js player');
  p1 = `${game.p1.name}${ (doNotShowScoreP1) ? `` : ` wins: ${game.p1.wins}` }`;
  p2 = `${game.p2.name}${ (doNotShowScoreP2) ? `` : ` wins: ${game.p2.wins}` }`;
  playerNames[0].innerText = p1;
  playerNames[1].innerText = p2;
};
