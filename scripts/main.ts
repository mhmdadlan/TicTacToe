class TicTacToe {
    Tiles: Array<HTMLElement>;
    CurrentPlayerDisplay: HTMLElement;
    Announcement: HTMLElement;
    IsGameActive: boolean = true;
    _playerX: string = 'X';
    _playerO: string = 'O';
    CurrentPlayer: string = this._playerX;
    _xmark: HTMLImageElement = document.createElement("img");
    _omark: HTMLImageElement = document.createElement("img");

    Board: Array<string> = new Array<string>("", "", "", "", "", "", "", "", "");

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
        resetButtuon.addEventListener("click", () => this.reset());
        this.CurrentPlayerDisplay = currentPlayerDisplay;
        this._xmark.src = "../images/xmark.svg";
        this._omark.src = "../images/omark.svg";
        this.setCurrentPlayer(this._playerX);

        tiles.forEach(element => {
            element.addEventListener("click", (ev: MouseEvent) => this.markTile(ev));
        });

    }

    private reset() {
        if (this.CurrentPlayer !== this._playerX)
            this.setCurrentPlayer(this._playerX);
        tiles.forEach(element => {
           element.textContent = "";
           element.dataset.selectedBy = undefined;
        });
    }

    private ChangePlayer() {
        if (this.CurrentPlayer == this._playerX)
            this.setCurrentPlayer(this._playerO)
        else
            this.setCurrentPlayer(this._playerX)
    }

    private setCurrentPlayer(player: string) {
        this.CurrentPlayer = player;
        this.CurrentPlayerDisplay.textContent = `Current Player is ${player}`;
    }

    private markTile(ev: MouseEvent) {
        let tile = ev.currentTarget as HTMLDivElement;

        if (tile.dataset.selectedBy == this._playerX || tile.dataset.selectedBy == this._playerO)
            return;

        if (this.CurrentPlayer == this._playerX) {
            tile.dataset.selectedBy = this._playerX;
            tile.append(this._xmark.cloneNode());
        } else if (this.CurrentPlayer == this._playerO) {
            tile.dataset.selectedBy = this._playerO;
            tile.append(this._omark.cloneNode());
        }

        this.ChangePlayer();
    }
}



const resetButtuon = document.getElementById("reset_button") as HTMLButtonElement;
const tiles = Array.from(document.querySelectorAll(".tile")) as Array<HTMLElement>;
const currentPlayer = document.getElementById("current_player_display") as HTMLSpanElement;

const game = new TicTacToe(resetButtuon, tiles, currentPlayer);