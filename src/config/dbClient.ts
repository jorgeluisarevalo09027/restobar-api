import { Db, MongoClient } from "mongodb";

import mongoose from "mongoose";

class dbClient {
    public db:  Db | null = null;

    constructor(){
        this.connectDataBase();
    }
    
    async connectDataBase( ) {
        const mongoUri =`mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.SERVER_DB}/RESTOBAR?retryWrites=true&w=majority`;
        
        // Validate environment variables
        if (!mongoUri) {
        throw new Error("Missing MongoDB connection URI environment variables.");
        }
        await mongoose.connect(mongoUri);

    }
    async disconectDataBase(){
        try {
            await mongoose.disconnect();
            console.log("database connection closed");
        } catch (error) {
            console.error("error in closing database connection",error);
        }
    }


}

export default new dbClient();