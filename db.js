const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    connectDB: async () => {
        try {
            mongoose.connect(process.env.DB_URL,);
            console.log("DB Connected")
        }
        catch (e) {
            console.log("The error is",e);
        }
    }
}