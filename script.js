"use strick";

// const askForCommand = () => window.prompt("What is your command?");

class User {
    constructor(email, type) {
        this.email = email;
        this.type = type;
    }

    test() {
        console.log("Work");
    }
}

class Cloud {}

// let command = askForCommand();
const r = new User();

let t = "test";

r[t]();
