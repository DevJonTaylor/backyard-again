# Backyard Again
[![MIT License](https://img.shields.io/badge/license-MIT-green?style=plastic "MIT License" )](./LICENSE)
[![Node v16.14 ](https://img.shields.io/badge/Node%20v16.14-339933?labelColor=ffffff&style=plastic&logo=node.js&logoColor=339933 'Node.JS')](https://nodejs.org/)
[![MySQL2 v2.3.3](https://img.shields.io/badge/MySQL2%20v2.3.3-00d1b2?labelColor=ffffff&style=plastic&logo=MySQL 'NodeJS Website')](https://www.npmjs.com/package/mysql2)
[![Sequelize v6.17.0](https://img.shields.io/badge/Sequelize%20v6.17.0-52b0e7?labelColor=ffffff&style=plastic&logo=sequelize&logoColor=52b0e7 'Sequelize NPM')](https://sequelize.org/)
[![ ESLint v8.13.0](https://img.shields.io/badge/ESLint%20v8.13.0-3a33d1?labelColor=ffffff&style=plastic&logo=eslint&logoColor=3a33d1)](https://eslint.org/)
[![ Prettier v2.6.2](https://img.shields.io/badge/Prettier%20v2.6.2-c596c7?labelColor=ffffff&style=plastic&logo=prettier&logoColor=c596c7)](https://prettier.io/)
[![Express v4.17.3](https://img.shields.io/badge/Express-v4.17.3-00e1ff?style=plastic 'Express Website' )](http://expressjs.com/)

## Table Of Contents
- [Description](#description)
- [Roadmap](#roadmap)
- [Installation](#installation)
  - [Dependencies](#dependencies)
  - [Clone](#clone)
  - [Zip](#zip)
- [Usage](#usage)
  - [Start](#start)
  - [Easy Seed and Configuration Setup](#easy-seed-and-configuration-setup)
  - [Login](#login)
- [Contact Me](#contact-me)
- [Experiences](#experiences)
  - [Object Oriented Programming](#object-oriented-programming)
  - [Sequelize Models](#sequelize-models)
  - [ShellScripts](#shellscripts)
- [License](#license)
## Description
This project was neat to create.  I went through and worked with Sequelize
for the first time.  I utilized ShellScript as part of the setup.  It
basically creates and installs the back end for an eCommerce.  You can find a  
walkthrough video [here](https://youtu.be/ZEm7VYBAwn8).
## Roadmap

- [x]  Create a schema file
- [x]  Implement Schema file with ShellScript
- [x]  Implement .env file creation with ShellScript
- [x]  Implement seed method
- [x]  Create the four models
- [x]  Create the four routes
- [x]  Create a class that can create and handle all four models
- [x]  Create a Routes in Insomnia and export the file
- [x]  Create walkthrough video

## Installation

You will need to have Nodejs installed along with Node Package Manager(NPM)  You can
find some links below on how to install Node and NPM on Windows, Linux, and macOS.
### Dependencies
[![Node v16.14 ](https://img.shields.io/badge/Node%20v16.14-339933?labelColor=ffffff&style=plastic&logo=node.js&logoColor=339933 'NodeJS Download Page')](https://nodejs.org/en/download/)
* [How to Install Node.js and NPM on Windows - phoenixNAP](https://phoenixnap.com/kb/install-node-js-npm-on-windows)
* [How to install Node.js and npm on macOS - newline](https://www.newline.co/@Adele/how-to-install-nodejs-and-npm-on-macos--22782681)
* [How To Install Node.js on Ubuntu 20.04 - DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04)
### Clone
Assuming you have Node and NPM you can clone this GitHub repo, go into the directory,
and install the package.json file with NPM.
```bash
git clone https://github.com/DevJonTaylor/backyard-again.git
cd gen-me-read
npm install
```
### Zip
Another method is to download the zip file, unzip the contents to a specific directory
and install the package.json file.

These commands that work on all three. (Windows, macOS, Linux) assuming they have
curl & tar.  Which newer version of Windows have.
```bash
curl -L -o backyard-again.zip https://github.com/DevJonTaylor/backyard-again/archive/refs/heads/main.zip
unzip backyard-again.zip
cd backyard-again-main
npm install
```
    ## Usage/Examples
You see a demo video [here](https://www.youtube.com/watch?v=ZEm7VYBAwn8).

## Usage
### Start
```bash
npm run start
```
### Easy Seed and Configuration Setup
I created a Shell Script that prompts the user for their MySQL username and password.
Which then turns around and creates the .env file and runs the schema.sql.  Then seeds
the tables
```bash
npm run schema:seed
```
![](./assets/images/schema_seeds.gif)
### Login
I exported the Insomnia.json for easy import and quick testing.
![](./assets/images/insomnia.png)

## Contact Me

- **Phone/SMS**: [(512)740-9784](tel:+15127409784/)
- **Email**: [jonnytest1101@icloud.com](mailto:jonnytest1101@icloud.com)
- **GitHub**: [@DevJonTaylor](https://www.github.com/devjontaylor)
- **LinkedIn**: [Vue-Shell](https://www.linkedin.com/in/vue-shell)
## Experiences

### Object Oriented Programming
I took my OOP to the next level.  This was interesting because one class controls all of
the routes and handles errors in the requests.  It was fun and super neat to watch as it
expanded through out the project.
### Sequelize Models
I really enjoy the concept and idea behind the Model.  I keep wanting to add more to the
Model class itself.  I think the next time I'll create a class that takes in the model
and builds off of the Model's themselves and connects them with the routes.
### ShellScripts
This was my first project implementing a ShellScript with the project.json.  Connecting
it with the prompt for credentials was super idea because it really allows for a smooth
setup in my opinion.

## License
[![MIT License](https://img.shields.io/badge/license-MIT-green?style=plastic)](./LICENSE)