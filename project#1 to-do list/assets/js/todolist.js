

let toDoList = () => {
   
    let storage = window.localStorage;
    let session = window.sessionStorage;
    var text = "my secret text"; //For hash passwords

    let logOut = document.getElementById("log-out");
    let message = document.getElementById("message");
    let main = document.getElementById("main");
    let signUpFormWrapper = document.getElementById("signUpFormWrapper");
    let logInFormWrapper = document.getElementById("logInFormWrapper");
    let editAccountFormWrapper = document.getElementById("account-settings");
    let dashboard = document.getElementById("dashboard");

    let userLogedIn = "";
    let userEmail = "";

    let warningMessage = (text) => {

        message.innerHTML = "<div class='alert-danger' id='alert'><span class='closebtn' id='closebtn'>&times;</span><strong>Warning! </strong>"+ text +". Please try again.</div>";

        let closeBtn = document.getElementById("closebtn");
        let alert = document.getElementById("alert");
        let closeAlert = () => {
        alert.style.display = "none";
        }
        closeBtn.addEventListener("click",closeAlert);

    }

    let successgMessage = (text) => {

        message.innerHTML = "<div class='alert-success' id='alert'><span class='closebtn' id='closebtn'>&times;</span><strong>Success! </strong>"+ text +"</div>";
        let closeBtn = document.getElementById("closebtn");
        let alert = document.getElementById("alert");

        let closeAlert = () => {
        alert.style.display = "none";
        }

        closeBtn.addEventListener("click",closeAlert);

        setTimeout(closeAlert,3000);
    

    }

    let isAnyInputEmpty = (inputs) => {
                    
        //we check if inputs value are not empty
        for (let i = 1; i < inputs.length; i++) {
            if (inputs[i].value.length === 0) {
                return true;
                break;
            } else {
                if (i === inputs.length -1) {
                    return false;
                }
            }
        }
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
            location.reload();
        }


        logOutButton.addEventListener("click",logOut);


    }

    let userDataEdition = (e) => {
      
        e.preventDefault();
        dashboard.style.display = "none";
        editAccountFormWrapper.style.display = "block";

        let editForm = document.getElementById("edit-account-form");
        let editButton = document.getElementById("edit-account-form-button");
        let closeButton = document.getElementById("edit-account-close-button");
        let inputs = editForm.getElementsByTagName("input");
        let userData = storage.getItem(userEmail);
        userData = JSON.parse(userData);

        //We fill inputs with stored user data
        inputs[0].value = userData.firstName;
        inputs[1].value = userData.lastName;
        inputs[2].value = userData.email;
        inputs[3].value = userData.password;
        inputs[4].checked = true;

        let edit = (e) => {
            e.preventDefault();

            let inputs = editForm.getElementsByTagName("input");
            let isSthInFormEmpty = isAnyInputEmpty(inputs);
            let dataFromForm = [];

            for (let i = 0; i < inputs.length; i++) {
                
                dataFromForm[i] = inputs[i].value;
                
            }

            if (isSthInFormEmpty) {
                let message = "You can't leave any empty inputs in the form";
                warningMessage(message);
            } else {
                let userData = storage.getItem(userEmail);
                userData = JSON.parse(userData);

                 //We save inputs to user data in localeStorage
                userData.firstName = dataFromForm[0];
                userData.lastName = dataFromForm[1];
                userData.email = dataFromForm[2];
                userData.password = dataFromForm[3];
                
                userData = JSON.stringify(userData);
                
                if (userEmail === inputs[2].value) {
                    storage.setItem(userEmail,userData);

                    let message ="Your account data were changed."
                    successgMessage(message);

                } else {
                    storage.setItem(inputs[2].value,userData);
                    storage.removeItem(userEmail);

                    let message ="Your account data were changed."
                    successgMessage(message);

                    console.log(storage);
                }

            } 
            
        }

        let close = (e) => {
            e.preventDefault();

            editAccountFormWrapper.style.display ="none";
            dashboard.style.display = "flex";
        }

        editButton.addEventListener("click",edit);
        closeButton.addEventListener("click", close);
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

            editList();

        }
}
    let editList = () => {
        let toDoListsDiv = document.getElementById("todo-lists-wrapper");
        let liList = document.getElementsByTagName("LI");
        let toDoListsNames = [];
        let editionZone = document.getElementById("list-edition-zone");
        let editionForm = document.getElementById("list-edition-form");
        let listToEdit ="";

        let saveChanges = (e) => {
            e.preventDefault();
            let inputs = editionForm.getElementsByTagName("INPUT");
            let isSthInFormEmpty = isAnyInputEmpty(inputs);
            let toDoListName = inputs[0].value;
            let itemsToDo = [];
            let checkedInputs = [];

            //we make list items to do
            for (let i = 1; i < inputs.length; i++) {
                
                if (i === 1 || i % 2 === 1) {
                    itemsToDo.push(inputs[i].value); 
                }

                if (i % 2 === 0) {
                    checkedInputs.push(inputs[i].checked);
                }
                
            }

            //We check wchich items was checked as done
            for (let i = 0; i < itemsToDo.length; i++) {
                
                if (checkedInputs[i] === true) {
                    itemsToDo[i] = "done-"+itemsToDo[i];
                }

            }

            itemsToDo = itemsToDo.toString();
            
             if (isSthInFormEmpty) {
                 let message = "Don't leave any empty items in Edit List form"
                 warningMessage(message);
                 
             } else {
                let userData = storage.getItem(userEmail);
                userData = JSON.parse(userData);
                let actualtoDoList = userData["list-" + listToEdit];
                actualtoDoList = actualtoDoList.split(",");

                //We take all saved lists
                let toDoLists = new Array();
                for (const key in userData) {
                    if (key.search("list") === 0) {
                        let list = key.slice(5);
                        toDoLists.push(list);
                    }
                  }

                  //We remove edited list from above list because we dont want to compare it's name
                  for (let i = 0; i < toDoLists.length; i++) {
                      
                      if (toDoLists[i] === listToEdit) {
                          toDoLists.splice(i,1);
                          break;
                      }
                  }
                
                  let isListNameUsed = "";
                  //We check if name list is already used
                  for (let i = 0; i < toDoLists.length; i++) {
                    
                      if (toDoLists[i] === toDoListName) {
                          isListNameUsed = true;
                          break;
                      } else {
                          if (i === toDoLists.length - 1) {
                              isListNameUsed = false;
                          }
                      }
                  }

                  if (isListNameUsed === true) {
                    let message = "This list's name is already used"
                     warningMessage(message); 
                  } else {

                    if (toDoListName === listToEdit) {
                         
                        userData["list-" + listToEdit] = itemsToDo;
                        userData = JSON.stringify(userData);

                        storage.setItem(userEmail,userData);
                        showLists();

                        let message = "Your list have been edited.";
                        successgMessage(message);

                        
                    } else {
                        delete userData["list-" + listToEdit];
                        userData["list-" + toDoListName] = itemsToDo;
                        userData = JSON.stringify(userData);

                        storage.setItem(userEmail,userData);
                        showLists();

                        let message = "Your list have been edited.";
                        successgMessage(message);
                    }

                  }



             }
           
            
        }

        let edit = (e) => {
            editionZone.style.display = "flex";

            //We clear the form to load another list when clicked
            while (editionForm.firstChild) {
                editionForm.removeChild(editionForm.firstChild);
            }

            //We create edition form
            let listName = "list-" + e.target.textContent;

            let userData = storage.getItem(userEmail);
            userData = JSON.parse(userData);

            let listItemsToEdit = userData[listName];
            listItemsToEdit = listItemsToEdit.split(",");

            let label = document.createElement("label");
            label.innerHTML= "List's Name: <br>"
            editionForm.appendChild(label);
            
            let input = document.createElement("input");
            input.value = e.target.textContent;
            listToEdit = e.target.textContent;
            editionForm.appendChild(input);

            let label2 = document.createElement("label");
            label2.innerHTML= "Items: <br>"
            editionForm.appendChild(label2);

            let newItemsDiv = document.createElement("DIV");
            newItemsDiv.setAttribute("id","new-items");
            editionForm.appendChild(newItemsDiv);

            //List items
            for (const element of listItemsToEdit) {
                
                let input = document.createElement("input");
                input.setAttribute("type","text");

                //We check wchich element is done and delete word done from it's name
                if (element.search("done") === 0) {
                    input.value = element.slice(5);
                } else {
                    input.value = element;
                }

                newItemsDiv.appendChild(input);

                let checkbox = document.createElement("input");
                checkbox.setAttribute("type","checkbox");
                checkbox.setAttribute("value","done");

                //We check wchich item is done
                if (element.search("done") === 0) {
                    checkbox.setAttribute("checked","true");
                }

                newItemsDiv.appendChild(checkbox);
            }

            let addItem = (e) => {
                e.preventDefault();
                let input = document.createElement("INPUT");
                input.setAttribute("type","text");
                newItemsDiv.appendChild(input);

                let checkbox = document.createElement("input");
                checkbox.setAttribute("type","checkbox");
                newItemsDiv.appendChild(checkbox);
            }

            let removeItem = (e) => {
                e.preventDefault();
                newItemsDiv.removeChild(newItemsDiv.lastChild);
                newItemsDiv.removeChild(newItemsDiv.lastChild);
            }

            let addItemButton = document.createElement("button");
            addItemButton.setAttribute("class","button button-gray");
            addItemButton.innerText="Add Item";

            editionForm.appendChild(addItemButton);

            addItemButton.addEventListener("click", addItem);

            let removeItemButton = document.createElement("button");
            removeItemButton.setAttribute("class","button button-red");
            removeItemButton.innerText = "Remove Item";

            editionForm.appendChild(removeItemButton);

            removeItemButton.addEventListener("click",removeItem);

            let saveEditButton = document.createElement("button");
            saveEditButton.setAttribute("type","submit");
            saveEditButton.setAttribute("class","button button-green");
            saveEditButton.innerText="Save Changes";

            editionForm.appendChild(saveEditButton);

            saveEditButton.addEventListener("click",saveChanges);

            let closeButton = document.createElement("button");
            closeButton.setAttribute("class","button button-red");
            closeButton.innerText = "Close";

            editionForm.appendChild(closeButton);

            let close = (e) => {
                e.preventDefault();

                editionZone.style.display = "none";
            }

            closeButton.addEventListener("click",close);


           

        }

        //Adding click function to list lists
        for (let i = 0; i < liList.length; i++) {
            toDoListsNames.push(liList[i].textContent);

            liList[i].addEventListener("click",edit);
        }
        
    }

    

    let createList = () => {

        let createListButton = document.getElementById("create-list-button");
        let saveListButton = document.getElementById("save-list-button");
        let closeButton = document.getElementById("createlist-close-button");
        let creatListDiv = document.getElementById("create-list-form-wrapper");
        let createListForm = document.getElementById("create-list-form");
        let itemsDiv = document.getElementById("list-items");
      

        let saveList = (e) => {
            e.preventDefault();

            let inputs = createListForm.getElementsByTagName("INPUT");
            let listName = "list-"+inputs[0].value;
            let listItems = [];

            //we check if inputs value are not empty
             let isSthInFormEmpty = isAnyInputEmpty(inputs);

            if (isSthInFormEmpty === true) {
                let message = "Don't leave any empty items in New List form";
                warningMessage(message);
            } else {
                let userData = storage.getItem(userEmail);
                userData = JSON.parse(userData);
                    let isListNameUsed = () => {
                        //we check if List's name is already used or not
                        for (let i = 1; i < inputs.length; i++) {
                            listItems.push(inputs[i].value);
                        }

                        let isListNameUsed ="";
                        let lists = new Array();

                        for (const key in userData) {
                            if (key.search("list") === 0) {
                                lists.push(key);
                            }
                        }

                        for (let i = 0; i < lists.length; i++) {
                            if (lists[i] === listName) {
                                return true;
                                break
                            } else {
                                if (i === lists.length-1) {
                                    return false;
                                }
                            }
                        }
                    }

                    let isNameListUsed = isListNameUsed();
                
                    if (isNameListUsed === true) {
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
            createListButton.style.display = "none";
            let addItemButton = document.getElementById("add-item-button");
            let removeItemButton = document.getElementById("remove-item-button");

            let addItem = (e) => {
                e.preventDefault();
                let li = document.createElement("INPUT");
                itemsDiv.appendChild(li);
            }

            let removeItem = (e) => {
                e.preventDefault();
                itemsDiv.removeChild(itemsDiv.lastChild);
            }

            addItemButton.addEventListener("click",addItem);
            removeItemButton.addEventListener("click",removeItem);

        }

        let close = (e) => {
            e.preventDefault();

            creatListDiv.style.display = "none";
            createListButton.style.display = "block";
        }

        createListButton.addEventListener("click",createListToDo);
        saveListButton.addEventListener("click",saveList);

        closeButton.addEventListener("click", close);
    }

    let signUp = () => { 

        let signUpForm = document.getElementById("sign-Up-form");

        let createUser = (e) => {
            e.preventDefault();

            let firstName = document.getElementById("first-name").value;
            let lastName = document.getElementById("last-name").value;
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;

                //Hash passwords
                var parameters = { "iter" : 1000 };
                var rp = {};
                var cipherTextJson = {};

                sjcl.misc.cachedPbkdf2(password, parameters);
                cipherTextJson = sjcl.encrypt(password, text, parameters, rp);
                //
            
            let signUpFormData = {};
            signUpFormData.firstName = firstName;
            signUpFormData.lastName = lastName;
            signUpFormData.email = email;
            signUpFormData.password = cipherTextJson;

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
                    let message = "User with that email already exist";
                    warningMessage(message);
                    
                } else {
                    let i = 0;
                    for (const key in signUpFormData) {

                        if (i === 2 ) {
                            validData = true;
                            break;
                        }
                        
                        if ( typeof signUpFormData[key] !== "string") {
                            validFormData = false;
                            let message = "Data should be only a text";
                           warningMessage(message);
                            break;
                        } else  if (signUpFormData[key].length > 30 || password.length > 30) {
                            validFormData = false;
                            let message = "Max input = 30 signs";
                            warningMessage(message);
                            break;
                        } else {
                            i++;
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
                    logOut.innerHTML = session.getItem("user") +" "+" <button class='button-logout' id='edit-user-button'>Account Settings</button> </button> <button class='button-logout' id='log-out-button'>Log Out</button>";
    
                    signUpFormWrapper.style.display = "none";
                    logOut.style.display = "inline";
                    dashboard.style.display = "block";
                    userEmail = email;
                    userLogedIn = true;

                    let editUserButton = document.getElementById("edit-user-button");
                    editUserButton.addEventListener("click", userDataEdition);

                    if (userLogedIn === true) {

                       logOutUser();
                       showLists();
                       createList();
                        
                    }
                } else {
                    let message = "Something is wrong";
                    warningMessage(message);
                }
            }

        }

        signUpForm.addEventListener("submit", createUser);

    }

    let logIn = () => {
        let logInForm = document.getElementById("logInForm");
        var parameters = { "iter" : 1000 }; // For unhashed passwords

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
                let message = "Wrong email";
                warningMessage(message);
                 
             } else {
                let user = storage.getItem(email);
                let userData = JSON.parse(user);

                sjcl.misc.cachedPbkdf2(password, parameters);
                var decryptedText = sjcl.decrypt(password, userData.password);
   
                if (text !== decryptedText) {

                    let message = "Wrong password";
                    warningMessage(message);
                    
                } else {
                    session.setItem("user",userData.firstName+ " " +userData.lastName);

                    logOut.innerHTML = session.getItem("user") +" "+" <button class='button-logout' id='edit-user-button'>Account Settings</button> <button class='button-logout' id='log-out-button'>Log Out</button>";
   
                    logInFormWrapper.style.display = "none";
                    logOut.style.display = "inline";
                    dashboard.style.display = "flex";
                    userEmail = email;
                    userLogedIn = true;

                    let editUserButton = document.getElementById("edit-user-button");
                    editUserButton.addEventListener("click", userDataEdition);

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