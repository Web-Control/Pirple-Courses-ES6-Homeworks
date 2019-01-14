

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
    let userEmail = "";

    let warningMessage = (text) => {

        message.innerHTML = "<div class='alert-danger' id='alert'><span class='closebtn' id='closebtn'>&times;</span><strong>Warning! </strong>"+ text +". Please try again.</div>"
        let closeBtn = document.getElementById("closebtn");
        let alert = document.getElementById("alert");
        let closeAlert = () => {
        alert.style.display = "none";
        }
        closeBtn.addEventListener("click",closeAlert)

    }

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

    let showLists = () => {
            let user = session.getItem("user");

            let userData = storage.getItem(userEmail);
            userData = JSON.parse(userData);
            let toDoLists = new Array();
            let toDoListsDiv = document.getElementById("todo-lists-wrapper");

            for (const key in userData) {
              if (key.search("list") === 0) {
                  let list = key.slice(5);
                  toDoLists.push(list);
              }
            }

            if (toDoLists.length === 0) {
                toDoListsDiv.innerText = "No lists so far.";
            } else {
                toDoListsDiv.innerHTML = "<ul class='to-do-lists' id='to-do-lists'></ul>";
                let toDoUl = document.getElementById("to-do-lists");

                for (let i = 0; i < toDoLists.length; i++) {
                    let li = document.createElement("LI");
                    li.setAttribute("id","list-"+(i+1));
                    toDoUl.appendChild(li);
                    let lastLi = document.getElementById("list-"+(i+1));
                    lastLi.innerHTML = toDoLists[i];  
                }
            }
    }

    let createList = () => {

        let createListButton = document.getElementById("create-list-button");
        let creatListDiv = document.getElementById("create-list-form-wrapper");
        let createListForm = document.getElementById("create-list-form");
        let itemsDiv = document.getElementById("list-items");
        let saveListButton = document.getElementById("save-list-button");

        let saveList = (e) => {
            e.preventDefault();

            let inputs = createListForm.getElementsByTagName("INPUT");
            let listName = "list-"+inputs[0].value;
            let listItems = [];

            //we check if inputs value are not empty
            let isAnyInputEmpty = "";
            for (let i = 1; i < inputs.length; i++) {
                if (inputs[i].value.length === 0) {
                    isAnyInputEmpty = true;
                    break;
                } else {
                    if (i === inputs.length -1) {
                        isAnyInputEmpty = false;
                    }
                }
            }

            if (isAnyInputEmpty === true) {
                let message = "Don't leave any empty items in New List form";
                warningMessage(message);
            } else {
                 //we check if List's name is already used or not
                    for (let i = 1; i < inputs.length; i++) {
                        listItems.push(inputs[i].value);
                    }

                    let userData = storage.getItem(userEmail);
                    userData = JSON.parse(userData);

                    let isListNameUsed ="";
                    let lists = new Array();

                    for (const key in userData) {
                        if (key.search("list") === 0) {
                            lists.push(key);
                        }
                    }

                    for (let i = 0; i < lists.length; i++) {
                        if (lists[i] === listName) {
                            isListNameUsed = true;
                            break
                        } else {
                            if (i === lists.length-1) {
                                isListNameUsed = false;
                            }
                        }
                    }
                
                    if (isListNameUsed === true) {
                        let message = "This list name is already used.";
                        warningMessage(message);
                        
                    } else {
                        listItems = listItems.toString();
                        userData[listName] = listItems;
                        userDataAsString = JSON.stringify(userData);  

                        storage.setItem(userEmail,userDataAsString);
                    }

                    showLists();
                 }

           
        }

        let createListToDo = (e) => {
            e.preventDefault();
            creatListDiv.style.display = "block";
            let addItemButton = document.getElementById("add-item-button");

            let addItem = (e) => {
                e.preventDefault();
                let li = document.createElement("INPUT");
                itemsDiv.appendChild(li);
            }

            addItemButton.addEventListener("click",addItem);

        }

        createListButton.addEventListener("click",createListToDo);
        saveListButton.addEventListener("click",saveList);
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

            let validFormData = "";
            let checkData = () => {

                let isUserEmailUsed = "";
                let validData = "";

                for (const key in storage) {
               
                    if (key === email) { 
                        isUserEmailUsed = true;
                        break;
                    } else {
                        isUserEmailUsed = false;
                    }
                 }
                
                if (isUserEmailUsed===true) {
                    message.innerHTML = "<div class='alert-danger' id='alert'><span class='closebtn' id='closebtn'>&times;</span><strong>Warning! </strong> User with that email already exist. Please try again.</div>"
                    let closeBtn = document.getElementById("closebtn");
                    let alert = document.getElementById("alert");
                    let closeAlert = () => {
                    alert.style.display = "none";
                    }
                    closeBtn.addEventListener("click",closeAlert)
                    
                } else {
                    let i = 0;
                    for (const key in signUpFormData) {
                        
                        if ( typeof signUpFormData[key] !== "string") {
                            validFormData = false;
                            message.innerHTML = "<div class='alert-danger' id='alert'><span class='closebtn' id='closebtn'>&times;</span><strong>Warning!</strong> Data should be only a text. Please try again.</div>"
                            let closeBtn = document.getElementById("closebtn");
                            let alert = document.getElementById("alert");
                            let closeAlert = () => {
                            alert.style.display = "none";
                            }
                            closeBtn.addEventListener("click",closeAlert)
                            break;
                        } else  if (signUpFormData[key].length > 30) {
                            validFormData = false;
                            message.innerHTML = "<div class='alert-danger' id='alert'><span class='closebtn' id='closebtn'>&times;</span><strong>Warning!</strong> Max input = 30 signs. Please try again.</div>"
                            let closeBtn = document.getElementById("closebtn");
                            let alert = document.getElementById("alert");
                            let closeAlert = () => {
                            alert.style.display = "none";
                            }
                            closeBtn.addEventListener("click",closeAlert)
                            break;
                        } else {
                            i++;
                            }

                        if (i === 4) {
                            validData = true;
                        }
                    }
                }

                if (validData === true && isUserEmailUsed === false) {
                    validFormData = true;
                }
            }
            
            checkData();

            if (validFormData === true) {
                
                let userData = JSON.stringify(signUpFormData);

                storage.setItem(email,userData);
                session.setItem("user",firstName + " " +lastName);
    
                if (session.user) {
                    logOut.innerHTML = session.getItem("user") +" "+" <button class='button-logout' id='log-out-button'>Log Out</button>";
    
                    signUpFormWrapper.style.display = "none";
                    logOut.style.display = "inline";
                    dashboard.style.display = "block";
                    userEmail = email;
                    userLogedIn = true;

                    if (userLogedIn === true) {

                       logOutUser();
                       showLists();
                       createList();
                        
                    }
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
                    userEmail = email;
                    userLogedIn = true;

                    if (userLogedIn === true) {

                       logOutUser();
                       showLists();
                       createList();
                        
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