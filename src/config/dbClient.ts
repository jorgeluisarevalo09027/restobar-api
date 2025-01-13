import { Db, MongoClient } from "mongodb";

class dbClient {
    private client:MongoClient;
    public db:  Db | null = null;
    
    constructor( ) {
        const mongoUri =`mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.SERVER_DB}/?retryWrites=true&w=majority&appName=RESTOBAR`;
        
        // Validate environment variables
        if (!mongoUri) {
        throw new Error("Missing MongoDB connection URI environment variables.");
        }
        
        this.client = new MongoClient(mongoUri);
        this.conectDb();
    }

    async conectDb(){
        try {
            await this.client.connect();
            this.db = this.client.db('basededatos');
            console.log("conectado al servidor de base de datos");
        } catch (error) {
            console.log(error)
        }
    }
}

export default new dbClient;