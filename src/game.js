class Game{
  constructor(p1Name, p2Name, p1Type, p2Type, inARowToWin) {
    this.board = [
      ['','',''],
      ['','',''],
      ['','','']
    ];
    this.p1 = new Player('x', './assets/ruby.png', (p1Name || 'Ruby Player'), 'ruby-bg', 'ruby-font', p1Type);
    this.p2 = new Player('o', './assets/js-icon.webp', (p2Name || 'JS Player'), 'js-bg', 'js-font', p2Type);
    this.currentPlayer = this.randomElementFromArray( [this.p1, this.p2] );
    this.p1.opponent = this.p2;
    this.p2.opponent = this.p1;
    this.inARowToWin = inARowToWin || 3;
    this.directions = {
      right: this.right,
      downRight: this.downRight,
      down: this.down,
      upRight: this.upRight
    };
    this.turns = 0;
    if(this.currentPlayer.playerType !== 'human'){
      this.takeTurn(this.randomOpenTile);
    }
  };

  randomElementFromArray(array) {
    var randomIndex = [ Math.floor( Math.random() * array.length ) ];
    return array[randomIndex];
  };

  tileIsEmpty(xy) {
    if ( this.board[ xy[0] ][ xy[1] ] === '' ) {
      return true;
    }
    return false;
  };

  takeTurn(xy) {
    this.board[ xy[0] ][ xy[1] ] = this.currentPlayer.symbol;
    if (this.turns === 0){
      this.p1.games++;
      this.p2.games++;
    }
    this.turns++;
  };

  switchCurrentPlayer() {
    this.currentPlayer = this.currentPlayer.opponent;
  };

  checkForWins(xy) {
    var horizontal = this.numInARow( [ xy[0], 0 ], this.directions.right );
    var vertical = this.numInARow( [ 0, xy[1] ], this.directions.down );
    var diagonalDR = this.numInARow( [ 0, 0 ], this.directions.downRight );
    var diagonalUR = this.numInARow( [ this.board.length - 1, 0 ], this.directions.upRight );
    return Math.max(horizontal, vertical, diagonalDR, diagonalUR) === this.inARowToWin;
  };

  numInARow(xy, direction) {
    if( this.board[ xy[0] ] === undefined ||
        this.board[ xy[0] ][ xy[1] ] === undefined ||
        this.board[ xy[0] ][ xy[1] ] !== this.currentPlayer.symbol ) {
      return 0;
    }
    return 1 + this.numInARow( direction(xy), direction );
  };

  giveTie(){
    this.p1.ties++;
    this.p2.ties++;
  }

  giveWin() {
    this.currentPlayer.wins++;
  };

  isEmpty() {
    return this.turns === 0;
  };

  randomOpenTile(){
    var openTiles = []
    for( var row = 0; row < this.board.length; row++ ) {
      for( var col = 0; col < this.board[row].length; col++) {
        if ( this.board[row][col] === '' ) {
          openTiles.push([row, col])
        }
      }
    }
    return this.randomElementFromArray(openTiles);
  }

  right(xy) {
    return [ xy[0], (xy[1] + 1) ];
  };

  downRight(xy) {
    return [ (xy[0] + 1), (xy[1] + 1) ];
  };

  down(xy) {
    return [ (xy[0] + 1), xy[1] ];
  };

  upRight(xy) {
    return [ (xy[0] - 1), (xy[1] + 1) ];
  };
};
