class Game{
  constructor(consecucutiveToWin){
    this.board = [
      ['','',''],
      ['','',''],
      ['','','']
    ];
    this.player1 = new Player('x', './assets/ruby.png', 'Ruby-Player', 'ruby');
    this.player2 = new Player('o', './assets/js-icon.webp', 'JS-Player', 'js');
    this.currentPlayer = this.randomPlayer([this.player1, this.player2]);
    this.player1.opponent = this.player2;
    this.player2.opponent = this.player1;
    this.consecucutiveToWin = consecucutiveToWin || 3;
    this.directions = { right, downRight, down, downLeft };
    this.turns = 0;
  }

  newGame(){
    this.currentPlayer.wins++;
    this.board = [
      ['','',''],
      ['','',''],
      ['','','']
    ];
    this.currentPlayer = this.randomPlayer([this.player1, this.player2]);
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
    if(this.xInARowAt(3, coordinates)){
      return true;
    } else {
      return false;

    }
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

    if (direction === undefined) {
      return this.xInARowAt(3, [ coordinates[0], 0 ], 'right') ||
             this.xInARowAt(3, [ 0, 0 ], 'downRight')  ||
             this.xInARowAt(3, [ 0, coordinates[1] ], 'down') ||
             this.xInARowAt(3, [ 0, this.board[0].length - 1 ], 'downLeft');
    }

    return this.xInARowAt(x-1, this.directions[direction](coordinates), direction);
  };
}

function right(coordinates){
  return [coordinates[0], coordinates[1] + 1];
};

function downRight(coordinates){
  return [coordinates[0] + 1, coordinates[1] + 1];
}

function down(coordinates){
  return [coordinates[0] + 1, coordinates[1]];
}

function downLeft(coordinates){
  return [coordinates[0] + 1, coordinates[1] - 1]
}
