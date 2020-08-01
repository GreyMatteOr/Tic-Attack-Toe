class Player{
  constructor(symbol, icon, name, bgClass, fontClass, wins){
    this.symbol = symbol;
    this.icon = icon;
    this.name = name || 'Test-bot';
    this.bgClass = bgClass;
    this.fontClass = fontClass;
    this.wins = wins || 0;
  }
};
