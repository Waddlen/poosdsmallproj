//API Interaction
var APIRoot = "./";
var fileExtension = ".php";
var userId = 0;

function addContact()
{
}

function searchContacts() {
    var search = document.getElementById("inlineFormInputName").value;
    
    if (localStorage.hasOwnProperty("Userid"))
    {
        var xhr= new XMLHttpRequest();
        xhr.open("POST","./SearchContacts.php",false);
        xhr.setRequestHeader("Content-type","application/json; charset=UTF-8");
        
        var Userid = localStorage.getItem("Userid");
        
        var jsonPayload = '{"Search" : "' + search + '", "Userid" : "' + Userid + '"}';
        
        try
        {
            xhr.onreadystatechange = function()
            {
                if (this.readyState == 4 && this.status == 200)
                {
                    var values = '';
                    var jsonObject = JSON.parse( xhr.responseText );
                    var i;
                    for (i = 0; i < jsonObject.results.length; i++)
                    {
                        values += jsonObject.results[i];
                        values += "\r";
                    }
                    alert(values);
                }
            };
            xhr.send(jsonPayload);
        }
        catch(err)
        {
            alert(err.message);
        }
    }
    else 
    {
        window.location.assign("index.html");
        document.getElementById("LogError").innerHTML = "You are not logged in";
    }
}

function doLogout()
{
    window.location.assign("index.html");
    localStorage.removeItem("Userid");
}

function doLogin(x)
{
    var login = document.getElementById("user").value;
    var password = document.getElementById("pass").value;

    var jsonPayload = '{"Username" : "' + login + '", "Password" : "' + password + '"}';

    //(0) means signing into account
    if(x == 0)
    {
        var xhr= new XMLHttpRequest();
        xhr.open("POST","./Login.php",false);
        xhr.setRequestHeader("Content-type","application/json; charset=UTF-8");
        
        //should access Login.php and post values to them. May need to use: $name = $_Post['Username']; to get value
//         $.post('Login.php', {Username: login, Password: password},
//         function(data)
//         {
//             //if .php states: echo "0"; all is good
//             if(data == "0")
//             {
//                 window.location.assign(window.location.hostname + "/contacts.html");
//             }
//             //Wrong password
//             else if(data == "1")
//             {
//                 document.getElementById("LogError").innerHTML = "Password was incorrect";
//             }
//             //Account doesn't exist
//             else
//             {
//                 document.getElementById("LogError").innerHTML = "This account does not exist";
//             }
//         });
        
        try
        {
            xhr.send(jsonPayload);
            var jsonObject = JSON.parse( xhr.responseText );
            Userid = jsonObject.Userid;
            LastLogin = jsonObject.LastLogin;
            DateCreated = jsonObject.DateCreated;
            if (Userid < 1)
            {
                Error = jsonObject.error;
                document.getElementById("LogError").innerHTML = Error;
                return;
            }
            Username = jsonObject.Username;
            window.location.assign("contacts.html");
            localStorage.setItem("Userid",Userid);
        }
        catch(err)
        {
            alert(err.message);
        }
        
        //xhr.open("GET", "Login.php", true);
        //xhr.send();
    }
    //(1) means creating an account
    else if(x == 1)
    {
        var xhr= new XMLHttpRequest();
        xhr.open("POST","./CreateAccount.php",false);
        xhr.setRequestHeader("Content-type","application/json; charset=UTF-8");
        
        //should access CreateAccount.php and post values to them. May need to use: $name = $_Post['Username']; to get value
//         $.post('CreateAccount.php', {Username: login, Password: password},
//         function(data)
//         {
//             //if .php states: echo "0"; all is good
//             if(data == "0")
//             {
//                 window.location.href = "contacts.html"
//             }
//             //Username is already being used
//             else
//             {
//                 document.getElementById("LogError").innerHTML = "Sorry, but this Username has been taken";
//             }
//         });
        
        try
        {
            xhr.send(jsonPayload);
            var jsonObject = JSON.parse( xhr.responseText );
            Userid = jsonObject.Userid;
            if (Userid < 1)
            {
                Error = jsonObject.error;
                document.getElementById("LogError").innerHTML = Error;
                return;
            }
            Username = jsonObject.Username;
            window.location.assign("contacts.html");
            localStorage.setItem("Userid",Userid);
        }
        catch(err)
        {
            alert(err.message);
        }
    }
    
    //are these .php files referring to, what? shouldn't doLogin refer to
    //Login.php or CreateAccount.php? Why is it referring instead to these?
    
}

// function getAccountDate()
// {
//     var d = new Date();
//     var m = d.getMonth();
//     var t = d.getDay();
//     var y = d.getFullYear();
//     //alert(m + " " + t + ", " + y);
//     return(m + " " + t + ", " + y);
// }
