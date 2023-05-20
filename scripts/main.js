class TicTacToe {
    constructor(resetButtuon, tiles, currentPlayerDisplay) {
        this.IsGameActive = true;
        this._playerX = 'X';
        this._playerO = 'O';
        this.CurrentPlayer = this._playerX;
        this._xmark = document.createElement("img");
        this._omark = document.createElement("img");
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
        resetButtuon.addEventListener("click", () => this.reset());
        this.CurrentPlayerDisplay = currentPlayerDisplay;
        this._xmark.src = "../images/xmark.svg";
        this._omark.src = "../images/omark.svg";
        this.setCurrentPlayer(this._playerX);
        tiles.forEach(element => {
            element.addEventListener("click", (ev) => this.markTile(ev));
        });
    }
    reset() {
        if (this.CurrentPlayer !== this._playerX)
            this.setCurrentPlayer(this._playerX);
        tiles.forEach(element => {
            element.textContent = "";
            element.dataset.selectedBy = undefined;
        });
    }
    ChangePlayer() {
        if (this.CurrentPlayer == this._playerX)
            this.setCurrentPlayer(this._playerO);
        else
            this.setCurrentPlayer(this._playerX);
    }
    setCurrentPlayer(player) {
        this.CurrentPlayer = player;
        this.CurrentPlayerDisplay.textContent = `Current Player is ${player}`;
    }
    markTile(ev) {
        let tile = ev.currentTarget;
        if (tile.dataset.selectedBy == this._playerX || tile.dataset.selectedBy == this._playerO)
            return;
        if (this.CurrentPlayer == this._playerX) {
            tile.dataset.selectedBy = this._playerX;
            tile.append(this._xmark.cloneNode());
        }
        else if (this.CurrentPlayer == this._playerO) {
            tile.dataset.selectedBy = this._playerO;
            tile.append(this._omark.cloneNode());
        }
        this.ChangePlayer();
    }
}
const resetButtuon = document.getElementById("reset_button");
const tiles = Array.from(document.querySelectorAll(".tile"));
const currentPlayer = document.getElementById("current_player_display");
const game = new TicTacToe(resetButtuon, tiles, currentPlayer);
