class Game{
  constructor(p1Name, p2Name, inARowToWin) {
    this.board = [
      ['','',''],
      ['','',''],
      ['','','']
    ];
    this.p1 = new Player('x', './assets/ruby.png', (p1Name || 'Ruby Player'), 'ruby-bg', 'ruby-font');
    this.p2 = new Player('o', './assets/js-icon.webp', (p2Name || 'JS Player'), 'js-bg', 'js-font');
    this.currentPlayer = this.randomPlayer( [this.p1, this.p2] );
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
  };

  newGame() {
    this.board = [
      ['','',''],
      ['','',''],
      ['','','']
    ];
    this.currentPlayer = this.randomPlayer( [this.p1, this.p2] );
    this.turns = 0;
  };

  randomPlayer(playerList) {
    var randomIndex = [ Math.floor( Math.random() * playerList.length ) ];
    return playerList[randomIndex];
  };

  tileIsEmpty(xy) {
    if ( this.board[ xy[0] ][ xy[1] ] === '' ) {
      this.board[ xy[0] ][ xy[1] ] = this.currentPlayer.symbol;
      this.turns++;
      return true;
    }
    return false;
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

  giveWin() {
    this.currentPlayer.wins++;
  };

  isEmpty() {
    return this.turns === 0;
  };

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
