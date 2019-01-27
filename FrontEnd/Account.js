//Account Functions
var users = 0;

function addUser()
{
    users++;
    return(users);
}

function createAccount()
{
    var id = addUser();
    var name = document.getElementById("user").innerHTML;
    var pass = document.getElementById("pass").innerHTML;
    var dateMade = getAccountDate()
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