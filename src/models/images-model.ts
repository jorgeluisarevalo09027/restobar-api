import images, { IImage } from '../schemas/image-schema';

import BaseModel from './base-model';

class ImagesModel extends BaseModel<IImage> {
    constructor() {
        super(images);
    }
}

export default new ImagesModel();
