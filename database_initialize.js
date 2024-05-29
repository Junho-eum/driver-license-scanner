import db from "./server/db/connection.js";
import readline  from "readline";

function confirmInit(){
    const ask = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise (resolve => ask.question('Press [Y] to confirm: ', answer => {
        if (answer.toUpperCase() == 'Y'){
            resolve(true);
        }
        else {
            return false;
        }
    }));
}

async function initDB(){
    const ans = await confirmInit();
    let collection = null;

    if (ans == true) {
        try {

            //put here 

            collection = await db.createCollection("survey-results");
            
            console.log("Database Initialized.");

        }
        catch (error) {
            console.log("Error initializing database: ", error);
        }
    }
    else {
        console.log("Not initialized.")
    }
    process.exit(0);
}

initDB();

