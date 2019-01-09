

let favColors = () => {
    const rectangleWrapper = document.getElementById("rectangleWrapper");
    const colors = ["#7EFF33","#F0FF33","#338BFF","#D133FF","#FB0303","#000000","#FA8903","#ACEA80","#909497","#34495E"];

    let createRectangles = () => {
        for (let i = 1 ; i <= 10; i++) {
            
            //Create divs as rectangle
            let rectangleDiv = document.createElement("div");
            rectangleWrapper.appendChild(rectangleDiv);

            //Adding classes and ids
                rectangleWrapper.childNodes[i].className = "rectangle";
                rectangleWrapper.childNodes[i].id = "color"+i;
                //Adding color to each rectangle
                rectangleWrapper.childNodes[i].style.backgroundColor = colors[i];
        }
    }

    let createLabels = () => {

        const rectangles = document.getElementById("rectangleWrapper").childNodes;
        const colors = ["#7EFF33","#F0FF33","#338BFF","#D133FF","#FB0303","#000000","#FA8903","#ACEA80","#909497","#34495E"];

        for (let i = 1; i< rectangles.length; i++) {
            const colorLabel = document.createElement("p");
            rectangles[i].appendChild(colorLabel);
            rectangles[i].childNodes[0].innerText = colors[i-1];
            rectangles[i].childNodes[0].style.margin = "100px 0px 0px 0px";

        }

    }

    createRectangles();
    createLabels();
    
}

let rectanglesId = () => {
    const rectangles = document.getElementById("rectangleWrapper").childNodes;
    console.log("Here are the rectangle IDs:")

    for (let i = 1; i < rectangles.length; i++) {

        console.log(rectangles[i].id);
        
    }
}

