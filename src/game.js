class Game{
  constructor(){
    this.board = [
      ['','',''],
      ['','',''],
      ['','','']
    ];
    this.player1 = new Player('x', './assets/ruby.png', 'Ruby-Player', '#9f7451');
    this.player2 = new Player('o', './assets/js-icon.webp', 'JS-Player', '#748540');
    this.currentPlayer = this.player1;
    this.player1.otherPlayer = this.player2;
    this.player2.otherPlayer = this.player1;
  }

  clickTile(tileID){
    var row = 'tmb'.indexOf(tileID[0]);
    var column = 'lcr'.indexOf(tileID[1]);
    console.log(`${row} ${column}`);
    if (this.board[row][column] === '') {
      console.log(`claimed with an ${this.currentPlayer.symbol}`);
      this.board[row][column] = this.currentPlayer.symbol;
      this.currentPlayer = this.currentPlayer.otherPlayer;
    }
    console.log(this.board)
  }
}
