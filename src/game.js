class Game{
  constructor(){
    this.board = [
      ['','',''],
      ['','',''],
      ['','','']
    ];
  }

  clickTile(tileID){
    var row = 'tmb'.indexOf(tileID[0]);
    var column = 'lcr'.indexOf(tileID[1]);
    console.log(`${row} ${column}`)
    if (this.board[row][column] === '') {
      console.log('claimed!')
      this.board[row][column] = 'x'
    }
  }
}
