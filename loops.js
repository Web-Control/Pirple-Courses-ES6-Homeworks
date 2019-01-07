let fizzBuzz = ( ) => {

    for (let i = 1; i <= 100; i++) {

        let checkIfPrime = false;
        //Checking if prime
        for (let n = 2; n <=100; n++) {

                if (i === n) {
                    continue;
                }
                if (i % n === 0) {
                    checkIfPrime = false;
                    break;
                } else if (n === 100) {
                    checkIfPrime = true;
                }
            
        }

        if ( i > 1 && checkIfPrime ) {

            console.log("prime");
            
        } else if ( (i % 3 === 0) && (i % 5 === 0) ) {

            console.log("FizzBuzz");

        } else if (i % 3 === 0) {
            console.log("Fizz");
            
        } else if (i % 5 === 0) {
            console.log("Buzz");
            
        } else {
            console.log(i);
        }


    }
}
