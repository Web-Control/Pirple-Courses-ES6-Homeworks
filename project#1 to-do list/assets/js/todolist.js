let signUpOrLogIn = () => {

    let main = document.getElementById("main");
    let signUpForm = document.getElementById("signUpFormWrapper");
    let logInForm = document.getElementById("logInFormWrapper");

    let signUpButton = document.getElementById("signUp-button");
    let logInButton = document.getElementById("logIn-button");

    let showSignUp = () => {
        main.style.display = "none";
        signUpForm.style.display = "inherit";
    }

    let showLogIn = () => {
        main.style.display = "none";
        logInForm.style.display = "inherit";
    }


    signUpButton.addEventListener("click",showSignUp);
    logInButton.addEventListener("click",showLogIn);

   

}

signUpOrLogIn();