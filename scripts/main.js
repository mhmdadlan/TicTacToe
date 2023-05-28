class TicTacToe {
    playerX = 'X';
    playerO = 'O';
    Board = new Array("", "", "", "", "", "", "", "", "");
    CurrentPlayer;
    IsGameActive = false;
    IsTieGame = false;
    WinningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    onGameEndEvent = () => {
        if (this.IsTieGame)
            console.log("The game is Tied");
        else
            console.log("The Winner is player " + this.CurrentPlayer);
    };
    onSetCurrentPlayerEvent = () => {
        console.log("Current player is " + this.CurrentPlayer);
    };
    MarkTile(tileIndex) {
        if (!this.IsValidMove(tileIndex))
            return;
        this.updateBoard(tileIndex);
        this.ValidateGameState();
        if (this.IsGameActive)
            this.ChangePlayer();
    }
    IsValidMove(tileIndex) {
        if (!this.IsGameActive || this.Board[tileIndex] != "")
            return false;
        return true;
    }
    updateBoard(tileIndex) {
        this.Board[tileIndex] = this.CurrentPlayer;
    }
    ValidateGameState() {
        let gameWon = false;
        for (let i = 0; i < this.WinningConditions.length; i++) {
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
        if (gameWon) {
            this.onGameEndEvent.call(this);
            this.IsGameActive = false;
        }
        if (!this.Board.includes("")) {
            this.IsTieGame = true;
            this.onGameEndEvent.call(this);
        }
    }
    ChangePlayer() {
        if (this.CurrentPlayer == this.playerX)
            this.SetCurrentPlayer(this.playerO);
        else
            this.SetCurrentPlayer(this.playerX);
    }
    SetCurrentPlayer(player) {
        this.CurrentPlayer = player;
        this.onSetCurrentPlayerEvent.bind(this).call();
    }
    Start() {
        this.IsGameActive = true;
        this.SetCurrentPlayer(this.playerX);
    }
    Reset() {
        if (this.CurrentPlayer !== this.playerX)
            this.SetCurrentPlayer(this.playerX);
        this.Board = new Array("", "", "", "", "", "", "", "", "");
        this.IsGameActive = true;
    }
}
const resetButtuon = document.getElementById("reset_button");
const tiles = Array.from(document.querySelectorAll(".tile"));
const currentPlayerDisplay = document.getElementById("current_player_display");
const gameAnnouncementElement = document.getElementById("announcement");
const xmark = document.createElement("img");
const omark = document.createElement("img");
xmark.src = "../images/xmark.svg";
omark.src = "../images/omark.svg";
const DisplayCurrentPlayer = () => currentPlayerDisplay.textContent = "Current player is " + game.CurrentPlayer;
const MarkTile = (tile, index) => {
    if (!game.IsValidMove(index))
        return;
    if (game.CurrentPlayer == game.playerX)
        tile.append(xmark.cloneNode());
    else if (this.CurrentPlayer == this._playerO)
        tile.append(omark.cloneNode());
    game.MarkTile(index);
};
const ShowcaseGameEndState = () => {
    if (game.IsTieGame) {
        gameAnnouncementElement.setAttribute("class", "");
        gameAnnouncementElement.textContent = "Game Is Tie";
    }
    else {
        gameAnnouncementElement.setAttribute("class", "");
        gameAnnouncementElement.textContent = game.CurrentPlayer + " Has Won";
    }
};
const ResetGame = () => {
    game.Reset();
    tiles.forEach((tile) => {
        tile.textContent = "";
    });
    gameAnnouncementElement.setAttribute("class", "hidden");
    gameAnnouncementElement.textContent = "";
};
resetButtuon.addEventListener("click", () => ResetGame());
tiles.forEach((element, index) => {
    element.addEventListener("click", () => MarkTile(element, index));
});
const game = new TicTacToe();
game.onGameEndEvent = ShowcaseGameEndState;
game.onSetCurrentPlayerEvent = DisplayCurrentPlayer;
game.Start();
