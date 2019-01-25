#!/bin/bash

#This script should keep the FrontEnd files continually up-to-date (every 5 min)

while true; do
git clone https://github.com/Xicronic/poosdsmallproj
sudo rm -rf /var/www/html/*
sudo cp ./poosdsmallproj/FrontEnd/* /var/www/html/
sleep 300
done
