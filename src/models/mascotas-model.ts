import Mascota from '../schemas/mascota-schema'

class mascotasModel {
    
    async create(mascota:any){
        return await Mascota.create(mascota)
    }
    
    async getAll(){
        return Mascota.find({});
    }
    
    async getOne(id:string){
        return Mascota.findById(id)
    }
    
    async update(id:string, mascota:any){
        return Mascota.findOneAndUpdate({_id:id},mascota,{new:true})
    }
    
    async delete(id:string){
        return Mascota.findOneAndDelete({_id:id});
    }
}

export default new mascotasModel;