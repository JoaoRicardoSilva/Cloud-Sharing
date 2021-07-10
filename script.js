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

const twoAlert = (str) => {
    alert(str);
    alert("");
};

//Cloud
class Cloud {
    add() {
        const email = saveCommand[1];
        const type = saveCommand[2].toLowerCase();

        let newUser;

        if (typeof findUserIndex(email) === "number") {
            twoAlert("Account already exists.");
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
        twoAlert("Account was added.");
    }
    upload() {
        const email = saveCommand[1];
        const nameFile = saveCommand[2];
        const size = Number(saveCommand[3]);
        const index = findUserIndex(email);

        if (index === undefined) {
            twoAlert("Account does not exist.");
            return;
        }

        if (saveUsers[index].files[nameFile]) {
            twoAlert("File already exists in the account.");
            return;
        }

        if (saveUsers[index].memory - size < 0) {
            twoAlert("File size exceeds account capacity.");
            return;
        }

        saveUsers[index].files[nameFile] = size;
        saveUsers[index].memory -= size;

        twoAlert("File uploaded into account.");
    }
    share() {
        const owner = saveCommand[1];
        const shareUser = saveCommand[2];
        const fileName = saveCommand[3];
        const indexUser = findUserIndex(owner);
        const indexShareUser = findUserIndex(shareUser);

        if (indexUser === undefined || indexShareUser === undefined) {
            twoAlert("Account does not exist.");
            return;
        }

        if (!saveUsers[indexUser].files[fileName]) {
            twoAlert("File does not exist.");
            return;
        }

        if (saveUsers[indexUser].type === "Basic") {
            twoAlert("Account does not allow file sharing.");
            return;
        }

        if (saveUsers[indexUser].filesShared[fileName]) {
            twoAlert("File already shared.");
            return;
        }

        if (
            saveUsers[indexShareUser].type === "Basic" &&
            saveUsers[indexShareUser].memory <
                saveUsers[indexUser].files[fileName] / 2
        ) {
            twoAlert("File size exceeds account capacity.");
            return;
        }

        // If first time share with owner
        if (saveUsers[indexShareUser].filesShared[owner] === undefined) {
            saveUsers[indexShareUser].filesShared[owner] = {};
            saveUsers[indexShareUser].filesShared[owner][fileName] =
                saveUsers[indexUser].files[fileName];
        } else {
            saveUsers[indexShareUser].filesShared[owner][fileName] =
                saveUsers[indexUser].files[fileName];
        }

        // if Basic Account take half of file size from memory
        if (saveUsers[indexShareUser].type === "Basic") {
            saveUsers[indexShareUser].memory -=
                saveUsers[indexUser].files[fileName] / 2;
        }
        twoAlert("File was shared.");
    }

    minspace() {
        if (saveUsers[0] === undefined) {
            twoAlert("No accounts.");
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
        twoAlert(`Account with least free space: ${account}`);
    }

    listfiles() {
        const userIndex = findUserIndex(saveCommand[1]);

        if (userIndex === undefined) {
            twoAlert("Account does not exist.");
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
            twoAlert("Account does not exist.");
            return;
        }

        //  If first account is not the owner of the file
        if (saveUsers[ownerIndex].files[file] === undefined) {
            twoAlert("File does not exist.");
            return;
        }

        // If file does not exist
        if (
            saveUsers[ownerIndex].files[file] === undefined &&
            saveUsers[updateAccountIndex].files[file] === undefined
        ) {
            twoAlert("File not shared.");
            return;
        }

        // If first account !== second account and file was not shared with the second account
        if (
            owner !== updateAccount &&
            // If second account don't have any file file shared with first account
            saveUsers[updateAccountIndex].filesShared[owner] === undefined
        ) {
            twoAlert("File not shared.");
            return;
        } else if (
            owner !== updateAccount &&
            // If second account already have file file shared with first account
            saveUsers[updateAccountIndex].filesShared[owner][file] === undefined
        ) {
        }

        // Save the update
        if (saveUsers[ownerIndex].updates[file] === undefined) {
            saveUsers[ownerIndex].updates[file] = [updateAccount];
        } else {
            saveUsers[ownerIndex].updates[file].unshift(updateAccount);
        }
        twoAlert("File was updated.");
    }

    lastupdate() {
        const account = saveCommand[1];
        const indexAccount = findUserIndex(account);
        const file = saveCommand[2];

        if (indexAccount === undefined) {
            twoAlert("Account does not exist.");
            return;
        }

        if (saveUsers[indexAccount].files[file] === undefined) {
            twoAlert("File does not exist.");
            return;
        }

        // If no updates return account that created the file
        if (saveUsers[indexAccount].updates[file] === undefined) {
            twoAlert(`Last update: ${account}`);
            return;
        }

        twoAlert(`Last update: ${saveUsers[indexAccount].updates[file][0]}`);
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
        twoAlert("Exiting...");
        return false;
    }

    return true;
};

while (getCommand()) {
    eddisCloud[saveCommand[0]]();
}
