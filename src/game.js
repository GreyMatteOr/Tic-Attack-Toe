class Game{
  constructor(){
    this.board = [
      ['','',''],
      ['','',''],
      ['','','']
    ];
    this.player1 = new Player('x', './assets/ruby.png', 'Ruby-Player', 'ruby');
    this.player2 = new Player('o', './assets/js-icon.webp', 'JS-Player', 'js');
    this.currentPlayer = this.player1;
    this.player1.opponent = this.player2;
    this.player2.opponent = this.player1;
  }

  tileIsEmpty(row, column){
    if (this.board[row][column] === ''){
      this.board[row][column] = this.currentPlayer.symbol;
      return true;
    }
    return false;
  }

  switchCurrentPlayer(){
    this.currentPlayer = this.currentPlayer.opponent;
  }
}
