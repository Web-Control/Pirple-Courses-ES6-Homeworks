function tictactoe() {

    
    let xDone = false;
    let oDone = "";
    
    let makeXY = () => {
        let board = document.getElementById("board");
        let divs = board.querySelectorAll("div");

        let writeXO = (event) => {
          
            if (!xDone) {
                let id = event.target.id;
                let clikedElement = document.getElementById(id);
    
                clikedElement.innerText = "x";
    
                xDone = true;
                oDone = false; 
            } else {
                let id = event.target.id;
                let clikedElement = document.getElementById(id);

                clikedElement.innerText = "O";

                xDone = false;
                oDone = true;
                }   
        }

        board.addEventListener("click", writeXO); 
    }

    makeXY();
    
}

tictactoe();