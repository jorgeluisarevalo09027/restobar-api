import { Request, Response } from "express";

import ImagesModel from '../models/images-model';

class imagesController {
    constructor(){}

    async create(req:Request, res:Response){
        try {
            const {id, name} = (req as any).user; 
   
            const { imageUrl } = req.body;
    
            if (!imageUrl) {
                res.status(400).json({ error: 'Image URL is required' });
                return
            }
    
            const newImage = await ImagesModel.create({ userId: id, imageUrl , userName:name });
            res.status(201).json(newImage);
            return
        } catch (error) {
            console.error('Error creating image:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return
        }  
    }
    
    async getAll(req:Request, res:Response){
        try {
            const userId = (req as any).user.id; // Obtener el ID del usuario autenticado
            const images = await ImagesModel.getAllByUser(userId);
            res.json(images);
            return
        } catch (error) {
            console.error('Error fetching images:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return
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