
//Socrates is a mortal man

let men = [1,2,3];
const socrates = 3;
let mortal = false;

if (typeof men[0] && typeof men[1] && typeof men[2] === number) {

    mortal = true;

    if (socrates === men[0] || socrates === men[1] || socrates === men[2]) {
        console.log("Socrates is mortal man")
    }

}


// Is this cake vanilla?

const cake = "vanilla";

if (cake === "vanilla" || "chocolate") {

    if (cake !== "chocolate") {
        
        console.log("This cake is vanilla");
    }

}



