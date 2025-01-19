import { Request, Response } from "express";

import UserModel from'../models/users.model';
import bcrypt from "bcryptjs";
import { generateToken } from "../helpers/auth";

class usersController {
    constructor(){
    }
    
    async register(req:Request,res:Response){
        try {
            const { email, name, phone, key } = req.body;
            const userExist = await UserModel.findUserByParams({ email });
            if(userExist){
                res.status(400).json({error: "user already exist"});
                return
            }
            const encriptedKey =  await bcrypt.hash(key,10);
            const data = await UserModel.create({email,name,phone,key:encriptedKey});
            const token = generateToken(data.email,data.name,data.id);
            res.status(200).json({message:'user created', token, data })
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    
    async login(req:Request,res:Response){
        try {
            const { email, key } = req.body;
            
            const data = await UserModel.findUserByParams({ email });
            
            if(!data){
               res.status(400).json({error: "user dosn't exist"});
               return
            } 
            
            const validKey = await bcrypt.compare(key,data.key);
                        
            if(!validKey){
                res.status(400).json({error: "invalid password"});
                return
            }
            const token = generateToken(email,data.name,data.id);
            
            res.status(200).json({ message:"user loged",token, data })
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}


export default new usersController();