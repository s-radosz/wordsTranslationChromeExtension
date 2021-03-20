function getUserInfo() {
    return new Promise((resolve) => {
        chrome.storage.local.get("user", function(response){
            if(response && response.user) {
                let user = JSON.parse(JSON.stringify(response.user));
    
                if(user.email && user.token) {
                    resolve({
                        token: user.token,
                        email: user.email,
                        id: user.id
                    })
                }
            }else {
                resolve("")
            }
        });
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

modules.exports.getUserInfo = getUserInfo,
modules.exports.readBody = readBody;