class Game{
  constructor(p1Obj, p2Obj, inARowToWin) {
    this.board = [
      ['','',''],
      ['','',''],
      ['','','']
    ];
    var p1StyleObj = {
      symbol: 'x',
      icon: './assets/ruby.png',
      bgClass: 'ruby-bg',
      fontClass: 'ruby-font'
    }
    var p2StyleObj = {
      symbol: 'o',
      icon: './assets/js-icon.webp',
      bgClass: 'js-bg',
      fontClass: 'js-font'
    }
    this.p1 = new Player(p1StyleObj, p1Obj);
    this.p2 = new Player(p2StyleObj, p2Obj);
    this.currentPlayer = this.randomElementFromArray( [this.p1, this.p2] );
    this.p1.opponent = this.p2;
    this.p2.opponent = this.p1;
    this.inARowToWin = inARowToWin || 3;
    this.turns = 0;
  };

  randomElementFromArray(array) {
    var randomIndex =  Math.floor( Math.random() * array.length );
    return array[randomIndex];
  };

  tileIsEmpty(coordinates) {
    if ( this.board[ coordinates[0] ][ coordinates[1] ] === '' ) {
      return true;
    }
    return false;
  };

  takeTurn(coordinates) {
    this.board[ coordinates[0] ][ coordinates[1] ] = this.currentPlayer.symbol;
    if (this.turns === 0){
      this.p1.games++;
      this.p2.games++;
    }
    this.turns++;
  };

  switchCurrentPlayer() {
    this.currentPlayer = this.currentPlayer.opponent;
  };

  checkForWins(coordinates) {
    var horizontal = this.numInARow( [ coordinates[0], 0 ], this.right );
    var vertical = this.numInARow( [ 0, coordinates[1] ], this.down );
    var diagonalDR = this.numInARow( [ 0, 0 ], this.downRight );
    var diagonalUR = this.numInARow( [ this.board.length - 1, 0 ], this.upRight );
    return Math.max(horizontal, vertical, diagonalDR, diagonalUR) === this.inARowToWin;
  };

  numInARow(coordinates, direction) {
    if( this.board[ coordinates[0] ] === undefined ||
        this.board[ coordinates[0] ][ coordinates[1] ] === undefined ||
        this.board[ coordinates[0] ][ coordinates[1] ] !== this.currentPlayer.symbol ) {
      return 0;
    }
    return 1 + this.numInARow( direction(coordinates), direction );
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

  findWinningMove(){
    var lines = [
      [[0,0],[0,1],[0,2]],
      [[1,0],[1,1],[1,2]],
      [[2,0],[2,1],[2,2]],
      [[0,0],[1,0],[2,0]],
      [[0,1],[1,1],[2,1]],
      [[0,2],[1,2],[2,2]],
      [[0,0],[1,1],[2,2]],
      [[0,2],[1,1],[2,0]]
    ];
    for( var player of [this.currentPlayer, this.currentPlayer.opponent] ){
      for( var line of lines ) {
        var symbolsArr = this.getEachSymbol(line);
        var win = this.hasAWinningPlay(symbolsArr);
        if( win !== -1 ) {
          return line[win];
        }
      }
    }
    return false;
  }

  getEachSymbol(line) {
    var symbols = [];
    for( var tile of line ){
      symbols.push( this.board[ tile[0] ] [tile[1] ] );
    }
    return symbols;
  }

  winMoveOrRandom() {
    return hasAWinningPlay() || randomOpenTile();
  }

  hasAWinningPlay(symbolArr){
    var count = {};
    for (var i = 0; i < symbolArr.length; i++){
      count[ symbolArr[i] ] = count[ symbolArr[i] ] ? count[ symbolArr[i] ] + 1 : 1;
    }
    if( count[this.p1.symbol] >= (this.inARowToWin - 1) ||
        count[this.p2.symbol] >= (this.inARowToWin - 1)) {
      return symbolArr.indexOf('');
    }
    return -1;
  }

  right(coordinates) {
    return [ coordinates[0], (coordinates[1] + 1) ];
  };

  downRight(coordinates) {
    return [ (coordinates[0] + 1), (coordinates[1] + 1) ];
  };

  down(coordinates) {
    return [ (coordinates[0] + 1), coordinates[1] ];
  };

  upRight(coordinates) {
    return [ (coordinates[0] - 1), (coordinates[1] + 1) ];
  };
};
