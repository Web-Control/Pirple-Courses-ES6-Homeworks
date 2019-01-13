

let toDoList = () => {

    let storage = window.localStorage;
    let session = window.sessionStorage;

    let logOut = document.getElementById("log-out");
    let message = document.getElementById("message");
    let main = document.getElementById("main");
    let signUpFormWrapper = document.getElementById("signUpFormWrapper");
    let logInFormWrapper = document.getElementById("logInFormWrapper");
    let dashboard = document.getElementById("dashboard");

    let userLogedIn = "";

    let signUpOrLogIn = () => {

        let signUpButton = document.getElementById("signUp-button");
        let logInButton = document.getElementById("logIn-button");

        let showSignUp = () => {
            main.style.display = "none";
            signUpFormWrapper.style.display = "inherit";
        }

        let showLogIn = () => {
            main.style.display = "none";
            logInFormWrapper.style.display = "inherit";
        }


        signUpButton.addEventListener("click",showSignUp);
        logInButton.addEventListener("click",showLogIn);

       // console.log(window.localStorage);

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

    let logOutUser = () => {

        let logOutButton = document.getElementById("log-out-button");

        let logOut = () => {
            session.removeItem("user");
            userLogedIn = false;
            console.log(session);
            location.reload();
        }


        logOutButton.addEventListener("click",logOut);


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

            session.setItem("user",firstName + " " +lastName);
            console.log(session);

            if (session.user) {
                logOut.innerHTML = session.getItem("user") +" "+" <button class='button-logout' id='log-out-button'>Log Out</button>";

                signUpFormWrapper.style.display = "none";
                logOut.style.display = "inline";
                dashboard.style.display = "block";
            } else {
                message.innerHTML = "<div class='alert-danger' id='alert'><span class='closebtn' id='closebtn'>&times;</span><strong>Warning!</strong> Something is wrong. Please try again.</div>"

                let closeBtn = document.getElementById("closebtn");
                let alert = document.getElementById("alert");
                let closeAlert = () => {
                    alert.style.display = "none";
                }
                closeBtn.addEventListener("click",closeAlert)


            }
            


        }

        signUpForm.addEventListener("submit", createUser);

    }

    let logIn = () => {
        let logInForm = document.getElementById("logInForm");

        let tryLogIn = (e) => {
            e.preventDefault();

            let email = document.getElementById("log-in-email").value;
            let password = document.getElementById("log-in-password").value;

            let emailPassed =""

            for (const key in storage) {
               
                if (key === email) { 
                    emailPassed = true;
                    break;
                } else {
                    emailPassed = false;
                }
             }

             if (!emailPassed) {
                message.innerHTML = "<div class='alert-danger' id='alert'><span class='closebtn' id='closebtn'>&times;</span><strong>Warning!</strong> Wrong email. Please try again.</div>"

                let closeBtn = document.getElementById("closebtn");
                let alert = document.getElementById("alert");
                let closeAlert = () => {
                    alert.style.display = "none";
                }
                closeBtn.addEventListener("click",closeAlert)
                 
             } else {
                let user = storage.getItem(email);
                let userData = JSON.parse(user);
   
                if (userData.password !== password) {

                    message.innerHTML = "<div class='alert-danger' id='alert'><span class='closebtn' id='closebtn'>&times;</span><strong>Warning!</strong> Wrong password. Please try again.</div>"
   
                    let closeBtn = document.getElementById("closebtn");
                    let alert = document.getElementById("alert");
                    let closeAlert = () => {
                        alert.style.display = "none";
                    }
                    closeBtn.addEventListener("click",closeAlert)
                    
                } else {
                    session.setItem("user",userData.firstName+ " " +userData.lastName);

                    logOut.innerHTML = session.getItem("user") +" "+" <button class='button-logout' id='log-out-button'>Log Out</button>";
   
                    logInFormWrapper.style.display = "none";
                    logOut.style.display = "inline";
                    dashboard.style.display = "block";
                    userLogedIn = true;

                    if (userLogedIn === true) {

                       logOutUser();
                        
                    }
                 }
   
             }

            
         }

        logInForm.addEventListener("submit",tryLogIn);


    }


    signUpOrLogIn();
    signUp();
    logIn();

}

toDoList();