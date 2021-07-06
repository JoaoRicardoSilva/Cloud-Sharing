"use strick";

// Memory
let saveCommand = [];
const saveUsers = [];

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

//Cloud
class Cloud {
    add() {
        const regex = /^ ([a-zA-Z0-9]+) ([a-zA-Z0-9]+)/gi;
        const group1 = saveCommand[1].match(regex)[1];
        const group2 = saveCommand[1].match(regex)[2].toLowerCase();
    }
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

// PROGRAM START
const askForCommand = () => window.prompt("What is your command?");

const getCommand = () => {
    let regex = /^([a-zA-Z]+)| ([a-zA-Z0-9\º+\.+\ +]+)/gi;
    let call = askForCommand();

    // If User press "cancel"
    if (call === null) {
        saveCommand[0] = undefined;
        saveCommand[1] = undefined;
        return false;
    }

    // Save the command
    saveCommand[0] = call.match(regex)[0].toLowerCase();
    // Save the rest of the information
    saveCommand[1] = call.match(regex)[1];
    return true;
};

const loop = () => {
    if (typeof eddisCloud[saveCommand[0]] === "function") {
        while (saveCommand[0] !== "exit" && saveCommand[0]) {
            getCommand();
        }

        eddisCloud.exit();
    } else {
        eddisCloud.exit();
    }
};

// If User press "cancel" on first promp
getCommand() ? loop() : eddisCloud.exit();
