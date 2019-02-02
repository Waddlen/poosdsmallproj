# API EXAMPLES
The .PHP files take JSON input.
Here are some examples of using curl to pass JSON to the site:
Tests with * indicate there is no return on success - Jade (or someone else) pls fix
I'm going to denote variables as $VAR

TEST CREATE ACCOUNT

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

TEST LOGGING IN:
```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"Username":"John","Password":"Smith"}' \
  http://52.91.19.201/Login.php
  ```
TEST VIEW CONTACTS:
```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"Userid":"3"}' \
  http://52.91.19.201/ViewContacts.php
```
TEST ADD CONTACT*:
```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"ContactFirstName":"Johan","ContactLastName":"Smith","ContactNumber":"9999999999","Address":"Smithson Lane","Userid":"3"}' \
  http://52.91.19.201/AddContact.php
  ```
TEST DELETE CONTACT*:
```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"Userid":"3","Contactid":"5"}' \
  http://52.91.19.201/DeleteContact.php
  ```
TEST SEARCH CONTACTS (Search for contact containing letter J):
```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"Userid":"3","Search":"J"}' \
  http://52.91.19.201/SearchContacts.php
```
EDIT CONTACT:
```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"ContactFirstName":"Edited2","ContactLastName":"Smith","ContactNumber":"9999999999","Address":"Smithson Lane","Contactid":"3"}' \
  http://52.91.19.201/EditContact.php
```
