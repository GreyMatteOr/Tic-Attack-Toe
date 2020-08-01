class Player{
  constructor(symbol, icon, name, colorClass, opponent, wins){
    this.symbol = symbol;
    this.icon = icon;
    this.name = name || 'Test-bot';
    this.colorClass = colorClass;
    this.wins = wins || 0;
  }
};
