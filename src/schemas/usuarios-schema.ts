import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document{
    email:string,
    name:string,
    phone:string,
    key:string
}

const userSchema = new Schema<IUser>({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    name:{
        type:String,
        required:true,
        trim: true
    },
    phone:{
        type:String,
        required:true,
        
    },
    key:{
        type:String,
        require:true
    }
},{ timestamps:true });

export default mongoose.model<IUser>('users',userSchema);