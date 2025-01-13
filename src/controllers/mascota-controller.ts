import { Request, Response } from "express";

import mascotasModel from '../models/mascotas-model';

class mascotasController {
    constructor(){}

    async create(req:Request, res:Response){
        try {
            const data = await mascotasModel.create(req.body);
            res.status(201).json({ message:'mascota creada exitosamente', data })
        } catch (error) {
            res.status(500).send(error)
        }        
    }
    
    async getAll(req:Request, res:Response){
        try {
            const data = await mascotasModel.getAll();
            res.status(201).json({message:'lista retornada exitosamente',data})
        } catch (error) {
            res.status(500).send(error)
        }        
    }
    
    async getOne(req:Request, res:Response){
        try {
            const { id } = req.params;
            const data = await mascotasModel.getOne(id);
            res.status(201).json({message:'mascota retornada exitosamente', data })
        } catch (error) {
            res.status(500).send(error)
        }        
    }
    
    async update(req:Request, res:Response){
        try {
            const { id } = req.params;
            const data = await mascotasModel.update( id,req.body );
            res.status(201).json({message:'mascota actualizada exitosamente', data })
        } catch (error) {
            res.status(500).send(error)
        }        
    }
    
    async delete(req:Request, res:Response){
        try {
            const { id } = req.params;
            const data = await mascotasModel.delete(id);
            res.status(201).json({message:'mascota borrada exitosamente'})
        } catch (error) {
            res.status(500).send(error)
        }        
    }

}

export default new mascotasController(); 