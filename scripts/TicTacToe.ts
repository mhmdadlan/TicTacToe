export default class TicTacToe {
    Tiles: Array<HTMLElement>;
    CurrentPlayerDisplay: HTMLSpanElement;
    Announcement: HTMLElement;
    IsGameActive: boolean = true;
    _playerX: string = 'X';
    _playerO: string = 'O';
    CurrentPlayer: string = this._playerX;

    Board: Array<string> = new Array<string>("","","","","","","", "", "");

    WinningConditions: Array<Array<Number>> = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    constructor(resetButtuon: HTMLButtonElement, tiles: Array<HTMLElement>, currentPlayerDisplay: HTMLElement) {
        resetButtuon.addEventListener("click", this.reset);
        this.setCurrentPlayer(this._playerX);

        tiles.forEach(element => {
            element.addEventListener("click", this.markTile);
        });
        
        this.CurrentPlayerDisplay = currentPlayerDisplay;
        this.CurrentPlayerDisplay.textContent = "test"
    }

    private reset(){
        if(this.CurrentPlayer !== this._playerX)
        this.setCurrentPlayer(this._playerX);
    }
    private changePlayer(){
        if(this.CurrentPlayer == this._playerX)
        this.setCurrentPlayer(this._playerO)
        else
        this.setCurrentPlayer(this._playerX)
    }
    private setCurrentPlayer(player: string){
        this.CurrentPlayer = player;
    }
    
    private markTile() {
        this.changePlayer();
    }
}


