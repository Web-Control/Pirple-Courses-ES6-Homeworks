function tictactoe() {

    let board = document.getElementById("board");
    let divs = board.querySelectorAll("div");
    
    let xDone = false;
    let oDone = "";
    
    let makeXY = () => {

        let checkWhoWon = () => {

            let whoWon = () => {

                //Check if X has won
                if (divs[0].textContent === "X" && divs[1].textContent === "X" && divs[2].textContent === "X") {
                    alert("X has won !");
                    location.reload();
                    return true;
                }

                if (divs[3].textContent === "X" && divs[4].textContent === "X" && divs[5].textContent === "X") {
                    alert("X has won !");
                    location.reload();
                    return true;
                }

                if (divs[6].textContent === "X" && divs[7].textContent === "X" && divs[8].textContent === "X") {
                    alert("X has won !");
                    location.reload();
                    return true;
                }

                if (divs[0].textContent === "X" && divs[3].textContent === "X" && divs[6].textContent === "X") {
                    alert("X has won !");
                    location.reload();
                    return true;
                }

                if (divs[1].textContent === "X" && divs[4].textContent === "X" && divs[7].textContent === "X") {
                    alert("X has won !");
                    location.reload();
                    return true;
                }

                if (divs[2].textContent === "X" && divs[5].textContent === "X" && divs[8].textContent === "X") {
                    alert("X has won !");
                    location.reload();
                    return true;
                }

                if (divs[0].textContent === "X" && divs[4].textContent === "X" && divs[8].textContent === "X") {
                    alert("X has won !");
                    location.reload();
                    return true;
                }

                if (divs[2].textContent === "X" && divs[4].textContent === "X" && divs[6].textContent === "X") {
                    alert("X has won !");
                    location.reload();
                    return true;
                }

                //Check if O has won
                 //Check if X has won
                 if (divs[0].textContent === "O" && divs[1].textContent === "O" && divs[2].textContent === "O") {
                    alert("O has won !");
                    location.reload();
                    return true;
                }

                if (divs[3].textContent === "O" && divs[4].textContent === "O" && divs[5].textContent === "O") {
                    alert("O has won !");
                    location.reload();
                    return true;
                }

                if (divs[6].textContent === "O" && divs[7].textContent === "O" && divs[8].textContent === "O") {
                    alert("O has won !");
                    location.reload();
                    return true;
                }

                if (divs[0].textContent === "O" && divs[3].textContent === "O" && divs[6].textContent === "O") {
                    alert("O has won !");
                    location.reload();
                    return true;
                }

                if (divs[1].textContent === "O" && divs[4].textContent === "O" && divs[7].textContent === "O") {
                    alert("O has won !");
                    location.reload();
                    return true;
                }

                if (divs[2].textContent === "O" && divs[5].textContent === "O" && divs[8].textContent === "O") {
                    alert("O has won !");
                    location.reload();
                    return true;
                }

                if (divs[0].textContent === "O" && divs[4].textContent === "O" && divs[8].textContent === "O") {
                    alert("O has won !");
                    location.reload();
                    return true;
                }

                if (divs[2].textContent === "O" && divs[4].textContent === "O" && divs[6].textContent === "O") {
                    alert("O has won !");
                    location.reload();
                    return true;
                }

            }
             //We delayed checkign to prevent pop up alarm before last sign is writen into the box
            setTimeout(whoWon,1000);
    
            
        }

        let checkIfDraw = () => {

            let counter = 0 ;

            let ifDraw = () => {
                for (let i = 0; i < divs.length; i++) {
                    
                    if (divs[i].textContent === "X" || divs[i].textContent === "O") {
                        counter += 1;
                    }
                    if (counter === 9) {
                        alert("Cats game!")
                        location.reload();
                        
                    }
                    
                }
            }

            //We delayed checkign to prevent pop up alarm before last sign is writen into the box
            setTimeout(ifDraw,1000);
           
        }
       
        let writeXO = (event) => {
          
            if (!xDone) {
                let id = event.target.id;
                let clikedElement = document.getElementById(id);

                if (!clikedElement.innerText) {
                    clikedElement.style.color = "red"
                    clikedElement.innerText = "X"; 

                    xDone = true;
                    oDone = false; 
                }

               // checkWhoWon();

                let won = checkWhoWon();

                if (!won) {
                    checkIfDraw();
                }
               

            } else {
                    let id = event.target.id;
                    let clikedElement = document.getElementById(id);

                    
                    if (!clikedElement.innerText) {
                        clikedElement.innerText = "O";

                        xDone = false;
                        oDone = true;
                    }

                   // checkWhoWon();
                    let won = checkWhoWon();

                    if (!won) {
                        checkIfDraw();
                    }

                }   
        }

        board.addEventListener("click", writeXO); 
    }

    makeXY();
    
}

tictactoe();