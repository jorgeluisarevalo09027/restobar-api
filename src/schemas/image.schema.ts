import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IImage extends Document {
    userId: Types.ObjectId;
    userName:string;
    imageUrl: string;
}


const imageSchema = new Schema<IImage>({
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    userName: { type: String, required: true },
    imageUrl: { type: String, required: true },

}, { timestamps: true });


export default mongoose.model<IImage>('images', imageSchema);
