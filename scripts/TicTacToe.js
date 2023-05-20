export default class TicTacToe {
    constructor(resetButtuon, tiles, currentPlayerDisplay) {
        this.IsGameActive = true;
        this._playerX = 'X';
        this._playerO = 'O';
        this.CurrentPlayer = this._playerX;
        this.Board = new Array("", "", "", "", "", "", "", "", "");
        this.WinningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        resetButtuon.addEventListener("click", this.reset);
        this.setCurrentPlayer(this._playerX);
        tiles.forEach(element => {
            element.addEventListener("click", this.markTile);
        });
        this.CurrentPlayerDisplay = currentPlayerDisplay;
    }
    reset(resetButtuon) {
        if (this.CurrentPlayer !== this._playerX)
            this.setCurrentPlayer(this._playerX);
    }
    changePlayer() {
        if (this.CurrentPlayer == this._playerX)
            this.setCurrentPlayer(this._playerO);
        else
            this.setCurrentPlayer(this._playerX);
    }
    setCurrentPlayer(player) {
        this.CurrentPlayer = player;
        this.CurrentPlayerDisplay.textContent = `Current is Player ${player}`;
    }
    markTile() {
        this.changePlayer();
    }
}
