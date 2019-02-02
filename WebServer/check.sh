#!/bin/bash

# Run this on the server; checks for updates every ~10 seconds

cd ./poosdsmallproj/

while true; do
    git fetch
	UPSTREAM=${1:-'@{u}'}
	LOCAL=$(git rev-parse @)
	REMOTE=$(git rev-parse "$UPSTREAM")
	BASE=$(git merge-base @ "$UPSTREAM")

	if [ $LOCAL = $REMOTE ]; then
		echo "Up-to-date"
	elif [ $LOCAL = $BASE ]; then
		echo "Need to pull"
		git pull
		sudo rm -rf /var/www/html/*
		sudo cp ./FrontEnd/* /var/www/html/
		sudo cp ./API/* /var/www/html/
	elif [ $REMOTE = $BASE ]; then
		echo "Need to push"
	else
		echo "Diverged"
		git pull # Handle divergence ?
	fi
	sleep 10 # Re-check in 10 seconds
done
