//API Interaction
var APIRoot = "../API";
var fileExtension = ".php";
var userId = 0;

//Account Functions
var users = 0;

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
//     var dateMade = getAccountDate()
//     already have this in PHP file
}

function doLogin(x)
{
    var login = document.getElementById("user").value;
    var password = document.getElementById("pass").value;

    //var xhr= new XMLHttpRequest();

    //(0) means signing into account
    if(x == 0)
    {
        //should access Login.php and post values to them. May need to use: $name = $_Post['Username']; to get value
        $.post('Login.php', {Username: name, Password: pass},
        function(data)
        {
            //if .php states: echo "0"; all is good
            if(data == "0")
            {
                window.location.href = "contacts.html"
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
        //xhr.open("GET", "Login.php", true);
        //xhr.send();
    }
    //(1) means creating an account
    else if(x == 1)
    {
        //should access CreateAccount.php and post values to them. May need to use: $name = $_Post['Username']; to get value
        $.post('CreateAccount.php', {Username: name, Password: pass},
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