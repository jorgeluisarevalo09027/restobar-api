import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IImage extends Document {
    user: Types.ObjectId;
    imageUrl: string;
}


const imageSchema = new Schema<IImage>({
    user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    imageUrl: { type: String, required: true },

}, { timestamps: true });


export default mongoose.model<IImage>('images', imageSchema);
