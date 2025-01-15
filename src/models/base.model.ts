import { Document, Model, Types } from 'mongoose';

class BaseModel<T extends Document> {
    protected model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async create(data: Partial<T>): Promise<T> {
        return this.model.create(data);
    }

    async getAll(): Promise<T[]> {
        return this.model.find({});
    }

    async getOne(id: string): Promise<T | null> {
        return this.model.findById(new Types.ObjectId(id));
    }

    async update(id: string, data: Partial<T>): Promise<T | null> {
        return this.model.findByIdAndUpdate(new Types.ObjectId(id), data, { new: true });
    }

    async delete(id: string): Promise<T | null> {
        return this.model.findByIdAndDelete(new Types.ObjectId(id));
    }
}

export default BaseModel;
