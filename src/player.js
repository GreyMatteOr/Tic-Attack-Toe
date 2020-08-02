class Player{
  constructor(symbol, icon, name, bgClass, fontClass, wins){
    this.symbol = symbol;
    this.icon = icon;
    this.name = name.toLowerCase();
    this.bgClass = bgClass;
    this.fontClass = fontClass;
    this.wins = wins || 0;
  }

  importantData(){
    return {
      name: this.name,
      wins: this.wins
    };
  };

  eraseWins(){
    this.wins = 0;
  }
};
