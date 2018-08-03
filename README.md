# CircleCI AWS EC2 deployment example
Example of deploying a Node.js application to AWS EC2 using CircleCI

# Requirements
Before you start this tutorial, I assume you have the following:

* A Github repository
* A CircleCI account
* An AWS account
* A running AWS EC2 instance (Ubuntu 16.04)

# Configure EC2 instance
First you need to SSH into the remote server.
```
ssh ubuntu@xxx.xxx.xxx.xxx
```

# Install server dependencies (Node, Redis, MongoDB, Nginx)
Create file `install.sh` on the remote instance and copy contents from local folder `/ubuntu16.04/db/install.js`

Create file `createAdminUser.js` on the remote instance and copy contents from local folder `/ubuntu16.04/db/createAdminUser.js`.

```
chmod +x ./install.sh
install.sh
```

If done correctly all dependencies will be installed and a MongoDB admin user is created.

Alternatively you can type the commands by hand.

# Clone git repo
```
git clone https://github.com/ChristianRich/circleci-aws.git
```

# Docs
https://circleci.com/docs/2.0/single-box/#steps-for-installation-on-aws-ec2  
