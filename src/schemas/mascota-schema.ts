import mongoose from "mongoose"

const mascotaSchema = new mongoose.Schema({
  nombre: {
    type:String,
    required:true
    },
  tipo: {
    type:String,
    required:true
    },
  raza: {
    type:String,
    required:true
    },
  edad: {
    type:Number,
    required:true
    }
},
{ timestamps:true });

export default mongoose.model( 'coleccioninicial',mascotaSchema );