//API Interaction
var APIRoot = "./";
var fileExtension = ".php";
var userId = 0;

function addContact()
{
}

function doLogin(x)
{
    var login = document.getElementById("user").value;
    var password = document.getElementById("pass").value;

    var jsonPayload = '{"Username" : "' + login + '", "Password" : "' + password + '"}';
    var xhr= new XMLHttpRequest();
    xhr.open("POST","./Login.php",false);
    xhr.setRequestHeader("Content-type","application/json; charset=UTF-8");

    //(0) means signing into account
    if(x == 0)
    {
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
            document.write(jsonPayload);
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
            window.location.assign(window.location.hostname + "/contacts.html");
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
        //should access CreateAccount.php and post values to them. May need to use: $name = $_Post['Username']; to get value
        $.post('CreateAccount.php', {Username: login, Password: password},
        function(data)
        {
            //if .php states: echo "0"; all is good
            if(data == "0")
            {
                window.location.href = "contacts.html"
            }
            //Username is already being used
            else
            {
                document.getElementById("LogError").innerHTML = "Sorry, but this Username has been taken";
            }
        });
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
