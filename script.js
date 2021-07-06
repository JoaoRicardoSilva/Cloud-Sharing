"use strick";

const askForCommand = () => window.prompt("What is your command?");

//Cloud
class Cloud {
    add() {}
    upload() {}
    share() {}
    minSpace() {}
    listAll() {}
    exit() {
        alert("Exiting...");
        return;
    }
    update() {}
    lastUpdate() {}
}
const eddisCloud = new Cloud();

// Users
class User {
    constructor(email) {
        this.email = email;
    }
}

class BasicType extends User {
    memory = 2048;
    type = "basic";
}

class PremiumType extends User {
    memory = 5120;
    type = "premium";
}

const b = new BasicType();
const p = new PremiumType();

// PROGRAM START
let command = askForCommand();

// Put an if here to prevent unknown command

if (!command) {
    eddisCloud.exit();
}

while (command.toLowerCase() !== "exit" && command) {
    command = askForCommand();
}

eddisCloud.exit();
