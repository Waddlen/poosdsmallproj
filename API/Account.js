//API Interaction
var APIRoot = "../API/";
var fileExtension = ".php";
var userId = 0;

//Account Functions
var users = 0;
var contacts = 0;

function addUser()
{
    users++;
    return(users);
}

function createAccount(name,pass)
{
    var id = addUser();
    var login = document.getElementById("user").value;
    var password = document.getElementById("pass").value;
}

//Login into Account
function doLogin(x)
{
    //alert("Attempt Login");
    var login = document.getElementById("user").value;
    var password = document.getElementById("pass").value;

    //alert(login + " " + password);
    //window.location.href = "contacts.html";

    //Method 1 "JSON" FYI I'm pretty much copying from code.js so I'm not sure how well this will work
    var jsonPayload = '{"Username" : "' + login + '", "Password" : "' + password + '"}';
    var url;
    var xhr= new XMLHttpRequest();

    //Sign In
    if(x == 0)
    {
        url = APIRoot + "Login" + fileExtension;
        xhr.open("POST", url, false);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        try
        {
            xhr.send(jsonPayload);
            
            var jsonObject = JSON.parse( xhr.responseText );
            
            userId = jsonObject.id;
            
            if( userId < 1 )
            {
                document.getElementById("LogError").innerHTML = "User/Password combination incorrect";
                return;
            }
            /* This Looks like User info for the Contact page
            firstName = jsonObject.firstName;
            lastName = jsonObject.lastName;

            document.getElementById("userName").innerHTML = firstName + " " + lastName;
            
            document.getElementById("loginName").value = "";
            document.getElementById("loginPassword").value = "";
            
            hideOrShow( "loggedInDiv", true);
            hideOrShow( "accessUIDiv", true);
            hideOrShow( "loginDiv", false);
            */
        }
        catch(err)
        {
            document.getElementById("LogError").innerHTML = err.message;
        }
    }
    //Create Account
    else if(x == 1)
    {
        url = APIRoot + "CreateAccount" + fileExtension;
        xhr.open("POST", url, false);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        try
        {
            xhr.send(jsonPayload);
            
            var jsonObject = JSON.parse( xhr.responseText );
            
            userId = jsonObject.id;
            
            if( userId < 1 )
            {
                document.getElementById("LogError").innerHTML = "Account Info is incorrect or already taken";
                return;
            }
            /* This Looks like User info for the Contact page
            firstName = jsonObject.firstName;
            lastName = jsonObject.lastName;

            document.getElementById("userName").innerHTML = firstName + " " + lastName;
            
            document.getElementById("loginName").value = "";
            document.getElementById("loginPassword").value = "";
            
            hideOrShow( "loggedInDiv", true);
            hideOrShow( "accessUIDiv", true);
            hideOrShow( "loginDiv", false);
            */
        }
        catch(err)
        {
            document.getElementById("LogError").innerHTML = err.message;
        }
    }

    /*Method 2 "Post"
    //(0) means signing into account
    if(x == 0)
    {
        //should access Login.php and post values to them. May need to use: $name = $_Post['Username']; to get value
        
        
        $.post('Login.php', {Username: login, Password: password},
        function(data)
        {
            //if .php states: echo "0"; all is good
            if(data == "0")
            {
                window.location.href = "contacts.html";
            }
            //Wrong password
            else if(data == "1")
            {
                document.getElementById("LogError").innerHTML = "Password was incorrect";
            }
            //Account doesn't exist
            else
            {
                document.getElementById("LogError").innerHTML = "This account does not exist";
            }
        });
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
                window.location.href = "contacts.html";
            }
            //Username is already being used
            else
            {
                document.getElementById("LogError").innerHTML = "Sorry, but this Username has been taken";
            }
        });
    }
    */
}