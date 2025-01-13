import { ObjectId } from 'mongodb';
import dbClient from '../config/dbClient';

class mascotasModel {
    async create(mascota:any){
        const colMascotas = dbClient.db?.collection('coleccioninicial');
        return await colMascotas?.insertOne(mascota)
    }
    async getAll(){
        const colMascotas = dbClient.db?.collection('coleccioninicial');
        return await colMascotas?.find({}).toArray();
    }
    async getOne(id:string){
        const colMascotas = dbClient.db?.collection('coleccioninicial');
        return await colMascotas?.findOne({ _id: new ObjectId(id)})
    }
    async update(id:string, mascota:any){
        const colMascotas = dbClient.db?.collection('coleccioninicial');
        return await colMascotas?.updateOne({ _id: new ObjectId(id)}, { $set:mascota } )
    }
    async delete(id:string){
        const colMascotas = dbClient.db?.collection('coleccioninicial');
        return await colMascotas?.deleteOne({ _id: new ObjectId(id)});
    }
}

export default new mascotasModel;