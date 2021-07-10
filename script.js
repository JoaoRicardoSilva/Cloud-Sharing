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
        this.updates = {};
    }
}

class BasicType extends User {
    constructor(email) {
        super(email);
        this.memory = 2048;
        this.type = "Basic";
    }
}

class PremiumType extends User {
    constructor(email) {
        super(email);
        this.memory = 5120;
        this.type = "Premium";
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
            alert("");
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
        alert("");
    }
    upload() {
        const email = saveCommand[1];
        const nameFile = saveCommand[2];
        const size = Number(saveCommand[3]);
        const index = findUserIndex(email);

        if (index === undefined) {
            alert("Account does not exist.");
            alert("");
            return;
        }

        if (saveUsers[index].files[nameFile]) {
            alert("File already exists in the account.");
            alert("");
            return;
        }

        if (saveUsers[index].memory - size < 0) {
            alert("File size exceeds account capacity.");
            alert("");
            return;
        }
        saveUsers[index].files[nameFile] = size;

        saveUsers[index].memory -= size;

        alert("File uploaded into account.");
        alert("");
    }
    share() {
        const owner = saveCommand[1];
        const shareUser = saveCommand[2];
        const fileName = saveCommand[3];
        const indexUser = findUserIndex(owner);
        const indexShareUser = findUserIndex(shareUser);

        if (indexUser === undefined || indexShareUser === undefined) {
            alert("Account does not exist.");
            alert("");
            return;
        }

        if (!saveUsers[indexUser].files[fileName]) {
            alert("File does not exist.");
            alert("");
            return;
        }

        if (saveUsers[indexUser].type === "Basic") {
            alert("Account does not allow file sharing.");
            alert("");
            return;
        }

        if (saveUsers[indexUser].filesShared[fileName]) {
            alert("File already shared.");
            alert("");
            return;
        }

        if (
            saveUsers[indexShareUser].type === "Basic" &&
            saveUsers[indexShareUser].memory <
                saveUsers[indexUser].files[fileName] / 2
        ) {
            alert("File size exceeds account capacity.");
            alert("");
            return;
        }

        if (saveUsers[indexShareUser].filesShared[owner] === undefined) {
            saveUsers[indexShareUser].filesShared[owner] = {};
            saveUsers[indexShareUser].filesShared[owner][fileName] =
                saveUsers[indexUser].files[fileName];
        } else {
            saveUsers[indexShareUser].filesShared[owner][fileName] =
                saveUsers[indexUser].files[fileName];
        }

        if (saveUsers[indexShareUser].type === "Basic") {
            saveUsers[indexShareUser].memory -=
                saveUsers[indexUser].files[fileName] / 2;
        }
        alert("File was shared.");
        alert("");
    }
    minspace() {
        if (saveUsers[0] === undefined) {
            alert("No accounts.");
            alert("");
            return;
        }

        let space = saveUsers[0].memory;
        let account = saveUsers[0].email;

        for (let i = 0; i < saveUsers.length; i++) {
            if (saveUsers[i].memory < space) {
                space = saveUsers[i].memory;
                account = saveUsers[i].email;
            }
        }
        alert(`Account with least free space: ${account}`);
        alert("");
    }
    listfiles() {
        const userIndex = findUserIndex(saveCommand[1]);

        if (userIndex === undefined) {
            alert("Account does not exist.");
            alert("");
            return;
        }

        const alertOwnFiles = () => {
            const keys = Object.keys(saveUsers[userIndex].files);
            const values = Object.values(saveUsers[userIndex].files);

            if (keys[0] === undefined) {
                return;
            }

            for (let i = 0; i < keys.length; i++) {
                alert(`${keys[i]} (${values[i]} MB)`);
            }
        };
        const alertShareFiles = () => {
            const usersThatShared = Object.keys(
                saveUsers[userIndex].filesShared
            );
            const entries = Object.entries(saveUsers[userIndex].filesShared);

            if (usersThatShared[0] === undefined) {
                return;
            }

            for (let i = 0; i < usersThatShared.length; i++) {
                let getFile = Object.entries(entries[i][1]);
                for (let j = 0; j < getFile.length; j++) {
                    alert(`${getFile[j][0]} (${getFile[j][1]} MB) (shared)`);
                }
            }
        };

        alert("Account files:");
        alertOwnFiles();
        alertShareFiles();
        alert("");
    }

    listall() {
        if (saveUsers[0] === undefined) {
            return;
        }
        alert("All accounts:");
        saveUsers.map((i) => alert(`${i.email} (${i.type})`));
        alert("");
    }

    update() {
        debugger;
        const owner = saveCommand[1];
        const ownerIndex = findUserIndex(owner);
        const updateAccount = saveCommand[2];
        const updateAccountIndex = findUserIndex(updateAccount);
        const file = saveCommand[3];

        if (
            ownerIndex === undefined ||
            findUserIndex(updateAccount) === undefined
        ) {
            alert("Account does not exist.");
            alert("");
            return;
        }

        if (saveUsers[ownerIndex].files[file] === undefined) {
            alert("File does not exist.");
            alert("");
            return;
        }

        if (
            saveUsers[ownerIndex].files[file] === undefined &&
            saveUsers[updateAccountIndex].files[file] === undefined
        ) {
            alert("File not shared.");
            alert("");
            return;
        }

        if (
            owner !== updateAccount &&
            saveUsers[updateAccountIndex].filesShared[owner] === undefined
        ) {
            alert("File not shared.");
            alert("");
            return;
        } else if (
            owner !== updateAccount &&
            saveUsers[updateAccountIndex].filesShared[owner][file] === undefined
        ) {
            alert("File not shared.");
            alert("");
            return;
        }

        if (saveUsers[ownerIndex].updates[file] === undefined) {
            saveUsers[ownerIndex].updates[file] = [updateAccount];
        } else {
            saveUsers[ownerIndex].updates[file].unshift(updateAccount);
        }
        alert("File was updated.");
        alert("");
    }

    lastupdate() {
        const account = saveCommand[1];
        const indexAccount = findUserIndex(account);
        const file = saveCommand[2];

        if (indexAccount === undefined) {
            alert("Account does not exist.");
            alert("");
            return;
        }

        if (saveUsers[indexAccount].files[file] === undefined) {
            alert("File does not exist.");
            alert("");
            return;
        }

        if (saveUsers[indexAccount].updates[file] === undefined) {
            alert(`Last update: ${account}`);
            alert("");
            return;
        }

        alert(`Last update: ${saveUsers[indexAccount].updates[file][0]}`);
        alert("");
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
        alert("");
        return false;
    }

    return true;
};

while (getCommand()) {
    eddisCloud[saveCommand[0]]();
}
