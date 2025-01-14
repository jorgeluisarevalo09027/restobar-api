import { Request, Response } from "express";

import ImagesModel from '../models/images-model';
import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../config/aws";
import sharp from "sharp";

class imagesController {
    constructor(){}

    async uploadImage(req: Request, res: Response) {
        try {
            if (!req.file) {
                res.status(400).json({ message: "No se recibió ninguna imagen." });
                return
            }
    
            const { id, name } = (req as any).user;
           
            
            // Procesar la imagen con Sharp
            const processedImage = await sharp(req.file.buffer)
                .resize(800, 800, { fit: "inside" })
                .toFormat("png")
                .toBuffer();
    
            let imageUrl: string;
    
        
            // Subir a AWS S3
            const fileName = `images/${Date.now()}-${id}.png`;
      
            
            const uploadParams = {
                Bucket: process.env.AWS_BUCKET_NAME!,
                Key: `images/${Date.now()}-${id}.png`,
                Body: processedImage,
                ContentType: "image/png"
            };

            const test = await s3.send(new PutObjectCommand(uploadParams))
            imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.us-east-2.amazonaws.com/${fileName}`;

    
            // Guardar en MongoDB
            const newImage = await ImagesModel.create({ userId: id, userName: name, imageUrl });
            await newImage.save();
    
            res.status(201).json({ message: "Imagen subida exitosamente", image: newImage });
    
        } catch (error:any) {
            console.error('Error completo:', {
                message: error.message,
                name: error.name,
                code: error.$metadata?.httpStatusCode,
                requestId: error.$metadata?.requestId
            });
            throw error;
        }
    };
    

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
            res.status(200).json({message:'Imagen actualizada exitosamente', data })
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }        
    }
    
    async delete(req:Request, res:Response){
        try {
            const { id } = req.params;
            const data = await ImagesModel.delete(id);
            res.status(200).json({message:'Imagen borrada exitosamente'})
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }        
    }

}

export default new imagesController(); 