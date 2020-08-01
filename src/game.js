class Game{
  constructor(inARowToWin){
    this.board = [
      ['','',''],
      ['','',''],
      ['','','']
    ];
    this.player1 = new Player('x', './assets/ruby.png', 'Ruby Player', 'ruby');
    this.player2 = new Player('o', './assets/js-icon.webp', 'JS Player', 'js');
    this.currentPlayer = this.randomPlayer([this.player1, this.player2]);
    this.player1.opponent = this.player2;
    this.player2.opponent = this.player1;
    this.inARowToWin = inARowToWin || 3;
    this.directions = { right, downRight, down, downLeft };
    this.turns = 0;
  }

  newGame(){
    this.board = [
      ['','',''],
      ['','',''],
      ['','','']
    ];
    this.currentPlayer = this.randomPlayer( [this.player1, this.player2] );
    this.turns = 0;
  }

  randomPlayer(playerList){
    var randomIndex = [ Math.floor( Math.random() * playerList.length ) ]
    return playerList[randomIndex]
  }

  tileIsEmpty(coordinates){
    if (this.board[coordinates[0]][coordinates[1]] === ''){
      this.board[coordinates[0]][coordinates[1]] = this.currentPlayer.symbol;
      this.turns++;
      return true;
    }
    return false;
  }

  switchCurrentPlayer(){
    this.currentPlayer = this.currentPlayer.opponent;
  }

  checkForWins(coordinates){
    var horizontal = this.xInARowAt(this.inARowToWin, [ coordinates[0], 0 ], 'right');
    var vertical = this.xInARowAt(this.inARowToWin, [ 0, coordinates[1] ], 'down');
    var diagonalRight = this.xInARowAt(this.inARowToWin, [ 0, 0 ], 'downRight');
    var diagonalLeft = this.xInARowAt(this.inARowToWin, [ 0, this.board[0].length - 1 ], 'downLeft');
    return horizontal || vertical || diagonalRight || diagonalLeft;
  }

  xInARowAt(x, coordinates, direction){
    if( x === 0 ) {
      return true;
    }
    if( this.board[coordinates[0]] === undefined ||
        this.board[coordinates[0]][coordinates[1]] === undefined ||
        this.board[coordinates[0]][coordinates[1]] !== this.currentPlayer.symbol ) {
      return false;
    }
    return this.xInARowAt( (x - 1), this.directions[direction](coordinates), direction);
  };
}

function right(coordinates){
  return [ coordinates[0], (coordinates[1] + 1) ];
};

function downRight(coordinates){
  return [ (coordinates[0] + 1), (coordinates[1] + 1) ];
}

function down(coordinates){
  return [ (coordinates[0] + 1), coordinates[1] ];
}

function downLeft(coordinates){
  return [ (coordinates[0] + 1), (coordinates[1] - 1) ]
}
