// This sorts the table when you set the filter type in the drop-down menu.
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
}

// Deletes a table entry.
function deleteThis(id){
    if(confirm("Are you sure you would like to delete this contact?")){
        id.parentNode.parentNode.parentNode.removeChild(id.parentNode.parentNode);
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
