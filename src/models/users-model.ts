import users, { IUser } from '../schemas/usuarios-schema';

import BaseModel from './base-model';

class UserModel extends BaseModel<IUser> {
    constructor() {
        super(users);
    }
    
    async findUserByParams(params: Record<string, any>): Promise<IUser|null> {
        return this.model.findOne(params);
    }
}

export default new UserModel();