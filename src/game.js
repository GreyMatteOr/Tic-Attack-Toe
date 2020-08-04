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

  getSymbol( coordinates ) {
    if (
     this.board[ coordinates[0] ] === undefined ||
     this.board[ coordinates[0] ][ coordinates[1] ] === undefined) {
      return false;
    }
    return this.board[ coordinates[0] ][ coordinates[1] ];
   }

  randomElementFromArray(array) {
    var randomIndex =  Math.floor( Math.random() * array.length );
    return array[randomIndex];
  };

  hasStarted() {
    return this.turns > 0;
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

  checkForWins(coordinates) {
    var horizontal = this.numInARow( [ coordinates[0], 0 ], this.right );
    var vertical = this.numInARow( [ 0, coordinates[1] ], this.down );
    var diagonalDR = this.numInARow( [ 0, 0 ], this.downRight );
    var diagonalUR = this.numInARow( [ this.board.length - 1, 0 ], this.upRight );
    return Math.max(horizontal, vertical, diagonalDR, diagonalUR) === this.inARowToWin;
  };

  numInARow(coordinates, direction) {
    if( this.getSymbol(coordinates) !== this.currentPlayer.symbol ) {
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

  switchCurrentPlayer() {
    this.currentPlayer = this.currentPlayer.opponent;
  };

  winOrCornerStratOrTie() {
    return this.findWinningMove() || this.preventCornerStrat() || this.preventPin() || this.preventCross() || this.cornerStrat() || this.randomOpenTile();
  }

  preventCross() {
    var enemyTile = this.findFilledSpaceThatMatches( this.currentPlayer.opponent.symbol );
    var playerTile = this.findFilledSpaceThatMatches( this.currentPlayer.symbol );
    var adjacentSideTest = enemyTile;
    var adjacentCornerTest = playerTile;
    if( this.turns !== 3 || !this.isASide( enemyTile ) ) {
      return false
    }
    while( adjacentSideTest && this.getSymbol( adjacentSideTest ) !== '') {
      adjacentSideTest = this.sideTileBy(playerTile);
    }
    while( adjacentCornerTest && this.getSymbol( adjacentCornerTest ) !== '') {
      adjacentCornerTest = this.aCornerOnTheSameSideAs( adjacentSideTest );
    }
    return adjacentCornerTest;
  }

  beatCross(){
  }

  preventCornerStrat() {
    if ( this.turns === 1 &&
         this.isACorner( this.findFilledSpaceThatMatches( this.currentPlayer.opponent.symbol ) ) ) {
      return [1,1];
    }

    return false;
  }

  preventPin() {
    if( !game.hasStarted() ){
      return false;
    }
    var enemyTile = this.findFilledSpaceThatMatches( this.currentPlayer.opponent.symbol );
    var tileOpposite = this.oppositeCornerTile(enemyTile);
    if ( this.turns === 3 &&
     this.isACorner( enemyTile ) &&
     this.getSymbol( tileOpposite ) === this.currentPlayer.opponent.symbol ) {
      return this.sideTileBy(enemyTile);
    }
    return false;
  }

  oppositeCornerTile( coordinates ) {
    var height = this.board.length - 1 ;
    var width = this.board[coordinates[0]].length - 1;
    var row = coordinates[0];
    var col = coordinates[1];
    row += (coordinates[0] === 0) ? width : (-width);
    col += (coordinates[1] === 0) ? height : (-height)
    return [row, col];
  }

  sideTileBy( coordinates ) {
    var belowOrAbove = (coordinates[0] === 0) ?
                         [ coordinates[0] + 1, coordinates[1] ] :
                         [ coordinates[0] - 1, coordinates[1] ];
    var leftOrRight = (coordinates[1] === 0) ?
                         [ coordinates[0], coordinates[1] + 1 ] :
                         [ coordinates[0], coordinates[1] - 1 ];
    return this.randomElementFromArray( [belowOrAbove, leftOrRight] )
  }

  isASide(coordinates) {
    return !this.isACorner(coordinates) && !this.isCenter(coordinates);
  }

  isCenter(coordinates) {
    return ( coordinates[0] === 1 ) && ( coordinates[1] === 1 );
  }

  isACorner(coordinates) {
    var topOrBot = [ 0, this.board.length - 1 ].includes( coordinates[0] );
    var leftOrRight = [ 0, this.board[0].length - 1 ].includes( coordinates[1] );
    return topOrBot && leftOrRight;
  }

  cornerStrat() {
    var playerTile = this.findFilledSpaceThatMatches( this.currentPlayer.symbol );
    var enemyTile = this.findFilledSpaceThatMatches( this.currentPlayer.opponent.symbol );
    var corners = [
      [0,0],
      [2,0],
      [0,2],
      [2,2]
    ];
    this.removeFilledTiles(corners);
    if( corners.length <= 0){
      return false;
    }
    if( corners.length === 3 && this.turns == 1) {
      return this.aCornerOnTheSameSideAs( enemyTile );
    }
    if( !this.hasStarted() ) {
      return this.randomElementFromArray(corners);
    }
    if( corners.length === 4 ){
      return this.oppositeCornerTile( this.aCornerOnTheSameSideAs(enemyTile) )
    }
    return this.aCornerOnTheSameSideAs(playerTile) || this.randomElementFromArray( corners );
  }

  aCornerOnTheSameSideAs ( coordinates ) {
    var corners = [];
    if ( ( coordinates[0] === 0 ) ||
         ( coordinates[0] === this.board.length - 1 ) ) {
      corners.push( [ coordinates[0], 0 ] );
      corners.push( [ coordinates[0], 2 ] );
    }
    if ( ( coordinates[1] === 0) ||
         ( coordinates[1] === this.board[ coordinates[0] ].length - 1 ) ) {
      corners.push( [ 0, coordinates[1] ] );
      corners.push( [ 2, coordinates[1] ] );
    }
    this.removeFilledTiles( corners );
    return this.randomElementFromArray( corners );
  }

  removeFilledTiles( tileArray ) {
    for (var i = 0; i < tileArray.length; i++) {
      if ( this.getSymbol( tileArray[i] ) !== '' ) {
        tileArray.splice( i, 1 )
        i--;
      }
    }
  }

  findFilledSpaceThatMatches( symbol, board ){
    var arrayToSearch = board || this.board;
    for( var row = 0; row < arrayToSearch.length; row++ ) {
      for( var col = 0; col < arrayToSearch[row].length; col++ ) {
        if ( this.getSymbol( [row, col] ) === symbol ) {
          return [ row, col ];
        }
      }
    }
  }

  winOrRandom() {
    return this.findWinningMove() || this.randomOpenTile();
  }

  findWinningMove() {
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
    for( var player of [ this.currentPlayer, this.currentPlayer.opponent ] ){
      for( var line of lines ) {
        var symbolsArr = this.getEachSymbol(line);
        var win = this.hasAWinningPlay(symbolsArr, player.symbol);
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
      symbols.push( this.getSymbol(tile) );
    }
    return symbols;
  }

  hasAWinningPlay(symbolArr, symbol){
    var count = {};
    for (var i = 0; i < symbolArr.length; i++){
      count[ symbolArr[i] ] = count[ symbolArr[i] ] ? count[ symbolArr[i] ] + 1 : 1;
    }
    return ( count[symbol] >= (this.inARowToWin - 1) ) ? symbolArr.indexOf('') : -1;
  }

  randomOpenTile(){
    var openTiles = []
    for( var row = 0; row < this.board.length; row++ ) {
      for( var col = 0; col < this.board[row].length; col++) {
        if ( this.getSymbol( [row, col] ) === '' ) {
          openTiles.push([row, col])
        }
      }
    }
    return this.randomElementFromArray(openTiles);
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
