// This sorts the table when you set the filter type in the drop-down menu.
// Also runs the 'search' function, which requires the name entered to match exactly
function sortTable() {
    var table, rows, switching, i, x, y, shouldSwitch, filterType;
    table = document.getElementById("contactsTable");
    
    // See which filter type the user has selected
    var filterType = document.getElementById("inlineFormCustomSelect").value;

    // Continue only if a filter type has been selected
    switching = filterType == "emptyOption" ? false : true;

    // Make a loop that will continue until no switching has been done:
    while (switching) {

      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;

      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {

        // Start by saying there should be no switching:
        shouldSwitch = false;

        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[filterType];
        y = rows[i + 1].getElementsByTagName("TD")[filterType];

        // Check if the two rows should switch place:
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }

      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }

    // Now run the search query as well
    var searchText = document.getElementById("inlineFormInputName").value.toLowerCase();

    // Search through all the names and remove those which don't match.
    var tableText, match = false;
    for (var i = table.childNodes[3].childNodes.length - 2; i > 0; i-=2) {
      // First name
      tableText = table.childNodes[3].childNodes[i].childNodes[3].innerHTML.toLowerCase();
      if (searchText == tableText)
        match = true;
      
      // Last name
      tableText = table.childNodes[3].childNodes[i].childNodes[5].innerHTML.toLowerCase();
      if (searchText != tableText && match == false) {
        table.childNodes[3].removeChild(table.childNodes[3].childNodes[i]);
      }
    }
}

// Deletes a table entry.
function deleteThis(id, val){
    if(confirm("Are you sure you would like to delete this contact?")){
        id.parentNode.parentNode.parentNode.removeChild(id.parentNode.parentNode);
        
        var xhr= new XMLHttpRequest();
        xhr.open("POST","./DeleteContact.php",false);
        xhr.setRequestHeader("Content-type","application/json; charset=UTF-8");

        var jsonPayload = '{"Contactid" : "' + val + '"}';

        try
        {
            xhr.send(jsonPayload);
            var jsonObject = JSON.parse( xhr.responseText );
            var error = jsonObject.error;
            if (error != "")
            {
                confirm("Error deleting contact.");
            }
        }
        catch(err)
        {
            alert(err.message);
        }
    }
}

// Edits a table data entry. Sets all the fields to an editable text box. 
function editThis(el){
    // Replace 'edit' button with a 'save' button
    var row = el.parentNode.parentNode;
    row.getElementByClassName
    var editButton = row.childNodes[11].childNodes[0];
    var first = row.childNodes[3];
    var last = row.childNodes[5];
    var phone = row.childNodes[7];
    var email = row.childNodes[9];

    if (editButton.innerHTML == "Edit") {
      editButton.innerHTML = "Save";

      // Make all fields for this row editable
      first.contentEditable = "true";
      last.contentEditable = "true";
      phone.contentEditable = "true";
      email.contentEditable = "true";
      first.style.backgroundColor = "white";
      last.style.backgroundColor = "white";
      phone.style.backgroundColor = "white";
      email.style.backgroundColor = "white";
      first.style.border = "thin solid #2db2ff";
      last.style.border = "thin solid #2db2ff";
      phone.style.border = "thin solid #2db2ff";
      email.style.border = "thin solid #2db2ff";
    }

    // Wait for user to click 'save' button
    else {
      // Upon clicking 'save' button, change all the fields back to html, but with new values.
      editButton.innerHTML = "Edit";

      first.contentEditable = "false";
      last.contentEditable = "false";
      phone.contentEditable = "false";
      email.contentEditable = "false";
      first.style.backgroundColor = "initial";
      last.style.backgroundColor = "initial";
      phone.style.backgroundColor = "initial";
      email.style.backgroundColor = "initial";
      first.style.border = "initial";
      last.style.border = "initial";
      phone.style.border = "initial";
      email.style.border = "initial";      
    }
}

function EditContact()
{
  var fname = document.getElementById("fname").value;
  var lname = document.getElementById("lname").value;
  var phone = document.getElementById("phone").value;
  var addr = document.getElementById("addr").value;
    
  document.getElementById("fname").value = "";
  document.getElementById("lname").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("addr").value = "";
    
  if(fname == "" || lname == "" || phone == "")
  {
    alert("Contact not Edited. Missing information");
  }
    
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "./EditContact.php", false);
  xhr.setRequestHeader("Content-type","application/json; charset=UTF-8");
  var id = localStorage.getItem("Userid");
  var contact = localStorage.getItem("Updateid");

  var jsonPayload = '{"Contactid" : "' + contact + '", "ContactFirstName" : "' + fname + '", "ContactLastName" : "' + lname + '", "ContactNumber" : "' + phone + '", "Address" : "' + addr + '", "Userid" : "' + id + '"}';

  try
  {
    xhr.send(jsonPayload);
    var jsonObject = JSON.parse( xhr.responseText );
    var error = jsonObject.error;
    if (error != "")
        {
            confirm("Error editing contact.");
        }
  }
  catch(err)
  {
      alert(err.message);
  }
}

function AddContact()
{
  var fname = document.getElementById("fname").value;
  var lname = document.getElementById("lname").value;
  var phone = document.getElementById("phone").value;
  var addr = document.getElementById("addr").value;

  document.getElementById("fname").value = "";
  document.getElementById("lname").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("addr").value = "";

  if(fname == "" || lname == "" || phone == "")
  {
    alert("Contact not Created. Missing information");
  }

  if (localStorage.hasOwnProperty("Userid")) 
  {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "./AddContact.php", false);
      xhr.setRequestHeader("Content-type","application/json; charset=UTF-8");
      var id = localStorage.getItem("Userid");

      var jsonPayload = '{"ContactFirstName" : "' + fname + '", "ContactLastName" : "' + lname + '", "ContactNumber" : "' + phone + '", "Address" : "' + addr + '", "Userid" : "' + id + '"}';

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
  else
  {
      window.location.assign("index.html");
  }
}
