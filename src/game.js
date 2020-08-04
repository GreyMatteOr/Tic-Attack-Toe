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
    return this.findWinningMove() || this.preventCornerStrat() || this.preventPin() || this.cornerStrat() || this.cornerFork() || this.randomOpenTile();
  }

  preventCornerStrat() {
    console.log('prevent Corner!')
    if ( this.turns === 1 &&
         this.isACorner( this.findFilledSpaceThatMatches( this.currentPlayer.opponent.symbol ) ) ) {
      return [1,1];
    }
    console.log('fail!')
    return false;
  }

  preventPin() {
    console.log('prevent pin')
    var enemyTile = this.findFilledSpaceThatMatches( this.currentPlayer.opponent.symbol );
    var tileOpposite = this.oppositeCornerTile(enemyTile);
    if ( this.turns === 3 &&
     this.isACorner( enemyTile ) &&
     this.getSymbol( tileOpposite ) === this.currentPlayer.opponent.symbol ) {
      return this.sideTileBy(enemyTile);
    }
    console.log('fail')
    return false;
  }

  oppositeCornerTile( coordinates ) {
    var height = this.board.length - 1 ;
    var width = this.board[coordinates[0]].length - 1;
    var row = coordinates[0];
    var col = coordinates[1];
    row += (coordinates[0] === 0) ? width : (-width);
    col += (coordinates[1] === 0) ? height : (-height)
    return this.getSymbol( [row, column] )
  }

  sideTileBy( coordinates ) {
    console.log(`getting sideTileBy ${coordinates}`)
    var belowOrAbove = (coordinates[0] === 0) ?
                         [ coordinates[0] + 1, coordinates[1] ] :
                         [ coordinates[0] - 1, coordinates[1] ];
    var leftOrRight = (coordinates[1] === 0) ?
                         [ coordinates[0], coordinates[1] + 1 ] :
                         [ coordinates[0], coordinates[1] - 1 ];
    return this.randomElementFromArray( [belowOrAbove, leftOrRight] )
  }

  isACorner(coordinates){
    var topOrBot = [ 0, this.board.length - 1 ].includes( coordinates[0] );
    var leftOrRight = [ 0, this.board[0].length - 1 ].includes( coordinates[1] );
    return topOrBot && leftOrRight;
  }

  cornerStrat() {
    console.log('CORNER');
    if (!this.hasStarted()){
      return this.randomElementFromArray([
        [0,0],
        [2,0],
        [0,2],
        [2,2]
      ]);
    }
    if (this.turns === 1){
      return this.aCornerOnTheSameSideAs( this.findFilledSpaceThatMatches( this.currentPlayer.opponent.symbol ) );
    }
    if (this.turns === 2){
      return this.aCornerOnTheSameSideAs( this.findFilledSpaceThatMatches( this.currentPlayer.symbol ) )
    }
    console.log('FAIL');
    return false;
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

  findFilledSpaceThatMatches( symbol ){
    for( var row = 0; row < this.board.length; row++ ) {
      for( var col = 0; col < this.board[row].length; col++ ) {
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
    console.log('winning?')
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
    console.log('fail')
    return false;
  }

  getEachSymbol(line) {
    var symbols = [];
    for( var tile of line ){
      symbols.push( this.getSymbol(tile) );
    }
    return symbols;
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

  randomOpenTile(){
    console.log('RANDOM')
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
