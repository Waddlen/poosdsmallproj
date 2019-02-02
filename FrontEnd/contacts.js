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

function deleteThis(id){
    if(confirm("Are you sure you would like to delete this contact?")){
        id.parentNode.parentNode.parentNode.removeChild(id.parentNode.parentNode);
    }
}

/*
function editThis(id){
    id.value = "Save";
    row = id.parentNode.parentNode;
    first = row.childNodes[3];
    x = document.createElement("INPUT");
    x.setAttribute("type", "text");
      x.setAttribute("value", row.childNodes[3].innerHTML);
    row.replaceChild(x, first);
    last = row.childNodes[5];
    y = document.createElement("INPUT");
    y.setAttribute("type", "text");
      y.setAttribute("value", row.childNodes[5].innerHTML);
    row.replaceChild(y, last);
}
*/