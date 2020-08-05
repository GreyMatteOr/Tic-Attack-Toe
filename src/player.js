class Player{
  constructor(styleObj, dataObj) {
    this.symbol = styleObj.symbol;
    this.icon = styleObj.icon;
    this.bgClass = styleObj.bgClass;
    this.fontClass = styleObj.fontClass;
    this.type = dataObj.type;
    this.autoRun = dataObj.autoRun;
    this._playerData = this.retrievePDFromStorage();
    Object.defineProperty( this, 'name', {
      get() {
        return this._name.toLowerCase();
      },
      set(name) {
        this._name = name;
        this._playerData =  this.retrievePDFromStorage();
      }
    });
    this.name = dataObj.name;
    Object.defineProperty( this, 'wins', {
      get() {
        return this._playerData.wins;
      },
      set(num) {
        this._playerData.wins = num;
        this.savePDToStorage();
      }
    });
    Object.defineProperty( this, 'games', {
      get() {
        return this._playerData.games;
      },
      set(num) {
        this._playerData.games = num;
        this.savePDToStorage();
      }
    });
    Object.defineProperty( this, 'ties', {
      get() {
        return this._playerData.ties;
      },
      set(num) {
        this._playerData.ties = num;
        this.savePDToStorage();
      }
    });
  };

  stringifyImportantData() {
    return JSON.stringify({
      wins: this.wins,
      games: this.games,
      ties: this.ties
    });
  };

  eraseStats() {
    this.wins = 0;
    this.ties = 0;
    this.games = 0;
  };

  savePDToStorage() {
    localStorage.setItem( this.name, this.stringifyImportantData() );
  };

  retrievePDFromStorage() {
    var memory = JSON.parse( localStorage.getItem( this.name ) );
    return (memory) ? memory : { wins: 0, games: 0, ties: 0 };
  }

  isAutoAI() {
    return ( this.type !== 'human' ) && this.autoRun;
  }

  toggleAutoRun(){
    this.autoRun = !this.autoRun;
  }
};
