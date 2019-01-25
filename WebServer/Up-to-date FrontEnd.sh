#!/bin/bash

#This script should keep the FrontEnd files continually up-to-date (every 5 min)

while true; do
git clone https://github.com/Xicronic/poosdsmallproj
sudo rm -rf /var/www/html/*
sudo cp ./poosdsmallproj/FrontEnd/* /var/www/html/
rm -rf ./poosdsmallproj/ # Clear out folder, in case a file is deleted in a commit
echo "Synced, sleeping for 5 minutes"
sleep 300
done
