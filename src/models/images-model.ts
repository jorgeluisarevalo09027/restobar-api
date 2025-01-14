import images, { IImage } from '../schemas/image-schema';

import BaseModel from './base-model';

class ImagesModel extends BaseModel<IImage> {
    constructor() {
        super(images);
    }
    async getAllByUser(userId: string): Promise<IImage[]> {
        return this.model.find({ user: userId });
    }
}

export default new ImagesModel();
