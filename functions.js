
//isMortal function
 isMortal = (name) => {

    if (typeof name !== "string") {
        return false;
    } else {
        let mortalMen = ["Chris","John","Ben"];
        
        for (let index = 0; index < mortalMen.length; index++) { 
                if (name === mortalMen[index]) {
                    return true;
                    break;
                }
                if (index == mortalMen.length-1) {
                    return false;
                    break;
                 }
            };
    }

}


// Is this cake vanilla?
let cakes = ["vanilla","chocolate"];

cakeFlavor = (cakes,isItChocolate) => {
    let flavor = ""
    if (isItChocolate) {
        flavor = cakes[1];;
        return flavor;
    } else {
        flavor = cakes[0];
        return flavor;
    }
}



