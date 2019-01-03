/*
1.What is hoisting? 

Hoisting is deafult JavaScript behaviour of moving variable declaretion to the top of current scope. It's mean that you can first use variable and declare it on the bottom of the block or script if it is global variable.
Example:
<script>
x = 1;
y = 2;

function add (x,y) {
    return x+y;
}

var x;
var y;
</script>

Variables declared with let or const are not hoisted.

2.What are the differences between let, const and var? 

    Let and const have block scope, const make the variable's values unchangeable after first assignment. Var has only global or function scope.

   


*/

// So let we will use when we want to limit scope for our variable
function alarm(percent) {

    var alarm = {main: "green", trend: ""};

    if (percent >= 70 && percent < 80) {
        alram.main = "yellow";
        let trend = ""; //This variable has scope only within this "if" statement 
        if (percent > 72) {
            trend = 1
            if (percent > 74) {
                trend = 2
            }
        }

        if (trend === 2) {
            alarm.trend = "upward trend";
        }

    }

    if (percent >= 80 && percent < 90) {
        alram.main = "orange";
    }

    if (percent >= 90) {
        alram.main = "red";
    }

    return alarm;
}

//Const keep our variable's value unchangable.

const n = 6.56789;

function count(x,y) {
    var z = x*y/n;

    return z;
}

//Variable defined by var has global or function scope

var sth = ""; //Variable with global scope

function sayHello(yes) {
   
    var k = ""; //Variable with function scope

    if (yes) {
        k = 1;
        console.log("HELLO!!!");
    }
    
    if (!yes) {
        sth = "0";
    }
}