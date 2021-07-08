"use strick";

// Memory
let saveCommand;
const saveUsers = [];

// Users
class User {
    constructor(email) {
        this.email = email;
    }
    files = [];
}

class BasicType extends User {
    memory = 2048;
    type = "basic";
}

class PremiumType extends User {
    memory = 5120;
    type = "premium";
}

// Files
class File {
    constructor(name, memory) {
        this.name = name;
        this.memory = memory;
    }
}

// General functions

const checkEmail = (email) => {
    const emailExist = saveUsers.filter((x) => x.email === email);
    if (emailExist[0]) {
        return true;
    }
    return false;
};

//Cloud
class Cloud {
    add() {
        const email = saveCommand[1];
        const type = saveCommand[2].toLowerCase();

        let newUser;

        if (checkEmail(email)) {
            alert("Account already exists.");
            return
        }

        switch (type) {
            case "basic":
                newUser = new BasicType(email);
                break;
            case "premium":
                newUser = new PremiumType(email);
                break;

            default:
                break;
        }

        saveUsers.push(newUser);
        alert("Account was added.");
        debugger;
    }
    upload() {
        const email = saveCommand[1];
        const nameFile = saveCommand[2];
        const size = saveCommand[3];

        const 
    }
    share() {}
    minSpace() {}
    listAll() {}
    update() {}
    lastUpdate() {}
}
const eddisCloud = new Cloud();

// PROGRAM START HERE
const askForCommand = () => window.prompt("What is your command?");

const getCommand = () => {
    saveCommand = askForCommand();

    // If User press "cancel"
    if (!saveCommand) {
        alert("Exiting...");
        return false;
    }

    saveCommand = saveCommand.split(" ");

    saveCommand[0] = saveCommand[0].toLowerCase();

    if (saveCommand[0] === "exit") {
        alert("Exiting...");
        return false;
    }

    return true;
};

while (getCommand()) {
    eddisCloud[saveCommand[0]]();
}
