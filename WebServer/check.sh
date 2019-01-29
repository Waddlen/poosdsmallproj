#!/bin/bash

# Run this on the server; checks for updates every ~10 seconds

while true; do
if ! git diff --quiet remotes/origin/HEAD; then
 # Local files NOT up-to-date
 git clone https://github.com/Xicronic/poosdsmallproj
 sudo rm -rf /var/www/html/*
 sudo cp ./poosdsmallproj/FrontEnd/* /var/www/html/
 rm -rf ./poosdsmallproj/ # Clear out folder, in case a file is deleted in a commit 
fi
sleep 10 # Re-check in 10 seconds
done