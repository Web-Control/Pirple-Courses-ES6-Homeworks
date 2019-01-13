

let toDoList = () => {

    let storage = window.localStorage;
    let main = document.getElementById("main");
    let signUpFormWrapper = document.getElementById("signUpFormWrapper");
    let logInForm = document.getElementById("logInFormWrapper");
    let dashboard = document.getElementById("dashboard");

    let signUpOrLogIn = () => {

        let signUpButton = document.getElementById("signUp-button");
        let logInButton = document.getElementById("logIn-button");

        let showSignUp = () => {
            main.style.display = "none";
            signUpFormWrapper.style.display = "inherit";
        }

        let showLogIn = () => {
            main.style.display = "none";
            logInForm.style.display = "inherit";
        }


        signUpButton.addEventListener("click",showSignUp);
        logInButton.addEventListener("click",showLogIn);

        console.log(window.localStorage);

    //     let storage = window.localStorage;
    //     storage.setItem('UserSzymon','{"firstName":"Szymon", "lastName": "Chomej","listaNr1":"sniadanie,obiad,praca dowmowa,kolacja"}');
    // console.log(window.localStorage);
    // console.log(storage);
    // let userSzymon = JSON.parse(storage.getItem("UserSzymon"));
    // console.log(userSzymon);
    // console.log(typeof userSzymon);
    // let listaNr1 = userSzymon.listaNr1;
    // listaNr1 = listaNr1.split(",");
    // console.log(listaNr1);

    }

    let signUp = () => { 

        let signUpForm = document.getElementById("sign-Up-form");

        let createUser = (e) => {
            e.preventDefault();

            let firstName = document.getElementById("first-name").value;
            let lastName = document.getElementById("last-name").value;
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            
            let signUpFormData = {};
            signUpFormData.firstName = firstName;
            signUpFormData.lastName = lastName;
            signUpFormData.email = email;
            signUpFormData.password = password;

            let userData = JSON.stringify(signUpFormData);

            storage.setItem(email,userData);
            console.log(storage);

            signUpFormWrapper.style.display = "none";
            dashboard.style.display = "block";


        }

        signUpForm.addEventListener("submit", createUser);

    }

    signUpOrLogIn();
    signUp();

}

toDoList();