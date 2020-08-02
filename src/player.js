class Player{
  constructor(symbol, icon, name, bgClass, fontClass){
    this.symbol = symbol;
    this.icon = icon;
    this.bgClass = bgClass;
    this.fontClass = fontClass;
    this._name = '';
    Object.defineProperty( this, 'name', {
      get() {
        return this._name.toLowerCase();
      },
      set(name) {
        this._name = name;
      }
    });
    this.name = name;
    this._wins =  this.retrieveWinsFromStorage();
    Object.defineProperty( this, 'wins', {
      get() {
        return this._wins;
      },
      set(num){
        this._wins = num;
        this.saveWinsToStorage();
      }
    });
  }

  stringifyImportantData(){
    return JSON.stringify({
      name: this.name,
      wins: this.wins
    });
  };

  eraseWins(){
    this.wins = 0;
  }

  saveWinsToStorage(){
    localStorage.setItem( this.name, this.stringifyImportantData() );
  }

  retrieveWinsFromStorage(){
    var memory = JSON.parse( localStorage.getItem( this.name ) );
    return (memory) ? memory.wins : 0;
  }
};
