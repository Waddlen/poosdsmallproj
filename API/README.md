# API EXAMPLES
The .PHP files take JSON input.
Here are some examples of using curl to pass JSON to the site:
Tests with * indicate there is no return on success - Jade (or someone else) pls fix

TEST CREATE ACCOUNT* (NOTE: NEED TO CHANGE USERNAME TO BE UNIQUE):
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
TEST ADD CONTACT*:
```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"ContactFirstName":"Johan","ContactLastName":"Smith","ContactNumber":"9999999999","Address":"Smithson Lane","Userid":"3"}' \
  http://52.91.19.201/AddContact.php
  ```
