import { Request, Response } from "express";

import ImagesModel from '../models/images-model';

class imagesController {
    constructor(){}

    async create(req:Request, res:Response){
        try {
            const data = await ImagesModel.create(req.body);
            res.status(201).json({ message:'mascota creada exitosamente', data })
        } catch (error) {
            res.status(500).send(error)
        }        
    }
    
    async getAll(req:Request, res:Response){
        try {
            const data = await ImagesModel.getAll();
            res.status(200).json({message:'lista retornada exitosamente',data})
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }        
    }
    
    async getOne(req:Request, res:Response){
        try {
            const { id } = req.params;
            const data = await ImagesModel.getOne(id);
            if (!data) {
                res.status(404).json({ error: "Imagen no encontrada" });
                return
            }
            res.status(200).json({message:'Imagen retornada exitosamente', data })
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }        
    }
    
    async update(req:Request, res:Response){
        try {
            const { id } = req.params;
            const data = await ImagesModel.update( id,req.body );
            if (!data) {
                res.status(404).json({ error: "Imagen no encontrada" });
                return
            }
            res.status(200).json({message:'mascota actualizada exitosamente', data })
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }        
    }
    
    async delete(req:Request, res:Response){
        try {
            const { id } = req.params;
            const data = await ImagesModel.delete(id);
            res.status(200).json({message:'mascota borrada exitosamente'})
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }        
    }

}

export default new imagesController(); 