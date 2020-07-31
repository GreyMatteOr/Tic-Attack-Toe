var gameBoard = document.querySelector('#game-board');

gameBoard.addEventListener('click', checkTile)

function checkTile(event){
  var tile = event.target.closest('.tile')
  if (tile) {
    console.log(tile.id)
  }
}
