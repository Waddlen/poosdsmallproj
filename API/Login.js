function doLogin()
{
  var login = document.getElementById("loginName").value;
  var password = document.getElementById("loginPassword").value;
  document.getElementById("loginResult").innerHTML = "";
  
  var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';
  var url = urlBase + '/Login.aspx';
  
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, false);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try
  {
    xhr.send(jsonPayload);
    var jsonObject = JSON.parse( xhr.responseText );
    userId = jsonObject.id;
    if( userId < 1 )
    {
      document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
      return;
    }
    firstName = jsonObject.firstName;
    lastName = jsonObject.lastName;
    document.getElementById("userName").innerHTML = firstName + " " + lastName;
    document.getElementById("loginName").value = "";
		document.getElementById("loginPassword").value = "";
    hideOrShow( "loggedInDiv", true);
    hideOrShow( "accessUIDiv", true);
    hideOrShow( "loginDiv", false);
  }
  catch(err)
  {
    document.getElementById("loginResult").innerHTML = err.message;
  }
}
