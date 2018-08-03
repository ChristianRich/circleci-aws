#!/bin/bash
# Install dependencies on Ubuntu 16.04
set -e

# Permissions
sudo chown -R $USER:$(id -gn $USER) /home/ubuntu/.config

# Update packages, install Kerberos and build-essential package (dpkg-dev, g++, gcc, libc, make)
sudo apt-get update
sudo apt-get install libkrb5-dev -y
sudo apt-get install build-essential -y

# Install Node.js / NPM
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs

# Update to latest NPM and install Gulp and PM2 process manager
sudo npm install -g npm
sudo npm i -g gulp pm2 babel-cli

# Nginx
sudo apt-get install nginx -y
sudo update-rc.d nginx defaults

# Redis
sudo apt-get install redis-server -y

# Mongo DB 3.4.1
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb.list
sudo apt-get update
sudo apt-get install mongodb-org=3.4.1 mongodb-org-server=3.4.1 mongodb-org-shell=3.4.1 mongodb-org-mongos=3.4.1 mongodb-org-tools=3.4.10
ulimit -n 1024 # Increase soft limits

# Run createAdminUser.js with Mongo shell
mongo < createAdminUser.js
sudo systemctl start mongod
