document.addEventListener("DOMContentLoaded", async () => {
    let loginBtn = document.getElementById("submit");
    let logoutBtn = document.getElementById('logoutBtn');

    let checkTokenExists = await getToken();
    //alert(["checkTokenExists", checkTokenExists, checkTokenExists.length])

    if(!checkTokenExists) {
        showForm();

        //login click listener
        loginBtn.addEventListener("click", function(e) {
            e.preventDefault();
            
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;

            const xhr = new XMLHttpRequest();
            xhr.open("POST", "http://127.0.0.1:8000/api/login", true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({
                email: email,
                password: password
            }));

            xhr.onreadystatechange = async function() {
                if (xhr.readyState == 4) {
                    let response = JSON.parse(readBody(xhr))
                    
                    //invalid credentials
                    if(xhr.status !== 200) {
                        await handleLogout();

                        alert([response.result]);
                    }
                    //success sign in
                    else{
                        let token = response.result.token;

                        await handleSetToken(token)
                    }
                }
            }  
        });
    } else{
        showLogout();

        logoutBtn.addEventListener("click", async function() {
            await handleLogout();
        })
    }

    function handleLogout() {
        return new Promise((resolve, reject) => {
            chrome.storage.local.set({ "token": "" });
            showForm();
            resolve("token clear")
        });
        
    }

    function showForm() {
        document.getElementById('formLogin').style.display = 'block';
        document.getElementById('logoutBtn').style.display = 'none';
    }

    function showLogout() {
        document.getElementById('formLogin').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'block';
    }

    function getToken() {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get(["token"], function(items){
                if(items.token) {
                    resolve(items.token)
                }
                resolve("")
            });
        })
    }

    function handleSetToken(token) {
        return new Promise((resolve, reject) => {
            chrome.storage.local.set({ "token": token }, function(){
                showLogout();
            });

          
            resolve(token);
        })
    }
    
    function readBody(xhr) {
        var data;
        if (!xhr.responseType || xhr.responseType === "text") {
            data = xhr.responseText;
        } else if (xhr.responseType === "document") {
            data = xhr.responseXML;
        } else {
            data = xhr.response;
        }
        return data;
    }
});