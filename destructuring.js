/*
What is the differences between destructuring an object and destructuring an array? 

I see only one difference.

When you destructuring an array you have to remember that values from array will be assigne
to your variables in order they are in array.

When you destructuring object you dont care about properties order. You have to only know their names.
*/

//Destructring an array
let turtlesNinja = ["Donatello","Leonardo","Raphael","Michelangelo"];

let ninja1, ninja2, ninja3, ninja4;

[ninja1, ninja2, ninja3, ninja4] = turtlesNinja;


//Destructuring an object
let ninjaNumber1 = {
    name: "Donatello",
    maskColor: "purple",
    character: "sensible",
    weapon: "bo staff",
}

let {name,weapon,maskColor,character} = ninjaNumber1;




//Nested object
//You can destructuring nested object like normal object

let smartphone = {
    brand: "Xiaomi",
    model: "Mi 8",
    system: "Android 8.1 Oreo",
    measurements: {
        height: 154.9,
        width: 74.8,
        thickness: 7.6
    },
    display : {
        type: "Super Amoled",
        size: 6.21,
        resolution: "1080 x 2248",
        protection: "Corning Gorilla Glass 5"
    }
}

let {brand, model, display: {type:displayType,resolution}} = smartphone;

//Nested arrays
//You can destructuring nested array like normal array

let family = ["Bob Smith", "Janet Smith",["Mickey Smith","Lily Smith"]];
let [father,mother,[son,daughter]] = family;

