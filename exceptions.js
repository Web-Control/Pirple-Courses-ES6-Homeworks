let reverseJsonArray = (stringArray) => {
    let array = new Array();

    try {
        array = JSON.parse(stringArray);
        array = array.reverse();
        array = JSON.stringify(array);
        }
    catch(err) {
        return false;
    }

    return array;
}

//Extra
reverseJsonArray(); //Will return false
reverseJsonArray(true); //Will return false
reverseJsonArray(123); //Will return false
reverseJsonArray(["a","b","c"]); //Will return false
reverseJsonArray([1,2,3]); //Will return false
reverseJsonArray("Ninja Turtles :)"); //Will return false
reverseJsonArray('["a"]'); //Will return "["a"]"
reverseJsonArray('[]'); //Will return "[]""
reverseJsonArray('["2","4","6"]'); //Will return "["6","4","2"]"
reverseJsonArray('["1","3","5"]'); //Will return "["5","3","1"]"
reverseJsonArray('["Donatello","Raphael","Leonardo"]'); //Will return "["Leonardo","Raphael","Donatello"]"


