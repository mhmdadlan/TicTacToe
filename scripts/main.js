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
        tiles.forEach((element, index) => {
            element.addEventListener("click", () => this.markTile(element, index));
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
    updateBoard(index) {
        this.Board[index] = this.CurrentPlayer;
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
    markTile(tile, index) {
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
        this.updateBoard(index);
        this.IsWon();
        this.ChangePlayer();
    }
    IsWon() {
        let gameWon = false;
        for (let i = 0; i <= 7; i++) {
            let winningCondition = this.WinningConditions[i];
            let a = this.Board[winningCondition[0]];
            let b = this.Board[winningCondition[1]];
            let c = this.Board[winningCondition[2]];
            if (a === "" || b === "" || c === "")
                continue;
            if (a === b && b === c) {
                gameWon = true;
                break;
            }
        }
        if (gameWon)
            alert(this._playerX + " Has Won!");
    }
}
const resetButtuon = document.getElementById("reset_button");
const tiles = Array.from(document.querySelectorAll(".tile"));
const currentPlayer = document.getElementById("current_player_display");
const game = new TicTacToe(resetButtuon, tiles, currentPlayer);
