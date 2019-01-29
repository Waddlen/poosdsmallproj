//API Interaction
var APIRoot = "http://COP4331-3.com/IceCreams/API";
var fileExtension = ".php";
var userId = 0;
var firstName = '', lastName = '';
var xhttp = new XMLHttpRequest();

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
    //var name = document.getElementById("user").value;
    //var pass = document.getElementById("pass").value;
    var dateMade = getAccountDate()
}

function doLogin(x)
{
    var name = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;
    //(0) means signing into account
    if(x == 0)
    {
        $.post('SearchContacts.php', {variable: name, variable: pass});
    }
    //(1) means creating an account
    else if(x == 1)
    {
        $.post('Add.php', {variable: name, variable: pass});
    }
    
}

function getAccountDate()
{
    var d = new Date();
    var m = d.getMonth();
    var t = d.getDay();
    var y = d.getFullYear();
    //alert(m + " " + t + ", " + y);
    return(m + " " + t + ", " + y);
}

function returnToAccount()