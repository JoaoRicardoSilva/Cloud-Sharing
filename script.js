"use strick";

// Memory
let saveCommand;
const saveUsers = [];

// Users
class User {
    constructor(email) {
        this.email = email;
        this.files = {};
        this.filesShared = {};
    }
}

class BasicType extends User {
    constructor() {
        super();
        this.memory = 2048;
        this.type = "basic";
    }
}

class PremiumType extends User {
    constructor() {
        super();
        this.memory = 5120;
        this.type = "premium";
    }
}

// General functions

const findUserIndex = (mail) => {
    for (let i = 0; i < saveUsers.length; i++) {
        if (saveUsers[i].email === mail) {
            return i;
        }
    }
};

//Cloud
class Cloud {
    add() {
        const email = saveCommand[1];
        const type = saveCommand[2].toLowerCase();

        let newUser;

        if (typeof findUserIndex(email) === "number") {
            alert("Account already exists.");
            return;
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
    }
    upload() {
        const email = saveCommand[1];
        const nameFile = saveCommand[2];
        const size = Number(saveCommand[3]);
        const index = findUserIndex(email);

        if (index === undefined) {
            alert("Account does not exist.");
            return;
        }

        if (saveUsers[index].files[nameFile]) {
            alert("File already exists in the account.");
            return;
        }

        if (size - saveUsers[index] < 0) {
            alert("File size exceeds account capacity.");
            return;
        }

        saveUsers[index].files[nameFile] = size;

        saveUsers[index].memory -= size;
    }
    share() {
        const owner = saveCommand[1];
        const shareUser = saveCommand[2];
        const fileName = saveCommand[3];
        const indexUser = findUserIndex(owner);
        const indexShareUser = findUserIndex(shareUser);

        if (indexUser === undefined || indexShareUser === undefined) {
            alert("Account does not exist");
            return;
        }

        if (!saveUsers[indexUser].files[fileName]) {
            alert("File does not exist.");
            return;
        }

        if (saveUsers[indexUser].type === "basic") {
            alert("Account does not allow file sharing.");
            return;
        }

        if (saveUsers[indexUser].filesShared[fileName]) {
            alert("File already shared.");
            return;
        }

        if (
            saveUsers[indexShareUser].type === "basic" &&
            saveUsers[indexShareUser].memory <
                saveUsers[indexUser].files[fileName] / 2
        ) {
            alert("File size exceeds account capacity.");
            return;
        }

        saveUsers[indexShareUser].filesShared[shareUser] = {};
        saveUsers[indexShareUser].filesShared[shareUser][fileName] =
            saveUsers[indexUser].files[fileName];

        if (saveUsers[indexShareUser].type === "basic") {
            saveUsers[indexShareUser].memory -=
                saveUsers[indexUser].files[fileName] / 2;
        }
    }
    minspace() {
        if (saveUsers[0] === undefined) {
            alert("No accounts.");
            return;
        }

        let space = saveUsers[0].memory;
        let account = saveUsers[0].email;

        saveUsers.map((i) => {
            if (i.memory < space) {
                space = i.memory;
                account = i.email;
            }
        });
        debugger;
    }
    listall() {
        alert("Test");
    }
    update() {
        alert("Test");
    }
    lastupdate() {
        alert("Test");
    }
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
