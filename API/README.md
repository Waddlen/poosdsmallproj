# API EXAMPLES
The .PHP files take JSON input.
Here are some examples of using curl to pass JSON to the site:
Tests with * indicate there is no return on success - Jade (or someone else) pls fix
I'm going to denote variables as $VAR

# TEST CREATE ACCOUNT

INPUT: Username, Password

OUTPUT:

  IF VALID: {"error":"", "Userid":"$NEWUSERID"}
  
  IF INVALID: {"error":"Username already exists"}
```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"Username":"Janet","Password":"Smith"}' \
  http://52.91.19.201/CreateAccount.php
  ```

# TEST LOGGING IN: (datecreated and lastlogin are nonfunctional so their values will always be empty)

INPUT: Username, Password

OUTPUT

IF VALID: {"Username":"$USERNAME","DateCreated":"$DATECREATED","LastLogin":"$LASTLOGIN","Userid":"$USERID","error":""}

IF INVALID: {"Username":"","DateCreated":"","LastLogin":"","Userid":"0","error":"Invalid Password"}
```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"Username":"John","Password":"Smith"}' \
  http://52.91.19.201/Login.php
  ```
# TEST ADD CONTACT:

INPUT: ContactFirstName, ContactLastName, ContactNumber, Address

OUTPUT:

IF VALID: {"error":"", "Contactid":"$NEWCONTACTID"}

IF INVALID: {"error":"$SomeError"}
```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"ContactFirstName":"Johan","ContactLastName":"Smith","ContactNumber":"9999999999","Address":"Smithson Lane","Userid":"3"}' \
  http://52.91.19.201/AddContact.php
  ```
# TEST DELETE CONTACT*:
INPUT: Contactid

OUTPUT: 

IF VALID: (nothing)

IF INVALID: IF INVALID: {"Username":"","Userid":0,"error":"$SomeError"}

```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"Contactid":"33"}' \
  http://52.91.19.201/DeleteContact.php
  ```
# TEST SEARCH CONTACTS (Search for contact containing letter J):
INPUT: Userid

OUTPUT: an array of Contacts.

IF VALID (example): {"results":[{"Contactid":"3","Userid":"3","ContactFirstName":"Edited3","ContactLastName":Smith,"ContactNumber":"9999999999","Address":"Smithson Lane","error":""},{"Contactid":"7","Userid":"3","ContactFirstName":"Johan","ContactLastName":Smith,"ContactNumber":"9999999999","Address":"Smithson Lane","error":""}],"error":""}

IF INVALID: {"Username":"","Userid":0,"error":"No Records Found"}
```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"Userid":"3","Search":"J"}' \
  http://52.91.19.201/SearchContacts.php
```
# EDIT CONTACT:
INPUT: Contactid, ContactFirstName, ContactLastName, ContactNumber, Address

OUTPUT: an array of Contacts.

IF VALID: (nothing)

IF INVALID: {"Username":"","Userid":0,"error":"$SomeError"}
```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"ContactFirstName":"Edited2","ContactLastName":"Smith","ContactNumber":"9999999999","Address":"Smithson Lane","Contactid":"3"}' \
  http://52.91.19.201/EditContact.php
```
