const { config } = require("../config/secret");

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    mongoose.set('strictQuery', false); 
    await mongoose.connect(`mongodb+srv://${config.userDb}:${config.passDb}@cluster0.w4h7n1o.mongodb.net/beSmart`);
    console.log("maor : mongo connect 555")
}