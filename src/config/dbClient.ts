import { Db, MongoClient } from "mongodb";

import mongoose from "mongoose";

class dbClient {
    public db:  Db | null = null;
    private mongoUri: string;

    constructor(){
        this.mongoUri = this.buildMongoUri();
        this.connectDataBase();
    }

    private buildMongoUri(): string {
        const { USER_DB, PASS_DB, SERVER_DB } = process.env;
        
        if (!USER_DB || !PASS_DB || !SERVER_DB) {
            throw new Error("Missing required environment variables: USER_DB, PASS_DB, SERVER_DB.");
        }

        return `mongodb+srv://${USER_DB}:${PASS_DB}@${SERVER_DB}/RESTOBAR?retryWrites=true&w=majority`;
    }
    
    async connectDataBase( ) {
        const mongoUri =`mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.SERVER_DB}/RESTOBAR?retryWrites=true&w=majority`;
        
        try {
            await mongoose.connect(this.mongoUri);
            console.log(" Database connected successfully.");
        } catch (error) {
            console.error(" Error connecting to database:", error);
            process.exit(1); 
        }

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