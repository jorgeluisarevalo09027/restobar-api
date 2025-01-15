import express from 'express';
import imagesController from '../controllers/images.controller';
import { tokenVerification } from '../helpers/auth';
import upload from "../config/multer";

const route = express.Router();

route.get('/',tokenVerification,imagesController.getAll);
route.post("/upload", tokenVerification, upload.single("image"), imagesController.uploadImage);
route.post('/',tokenVerification,imagesController.create);
route.get('/:id',tokenVerification,imagesController.getOne);
route.put('/:id',tokenVerification,imagesController.update);
route.delete('/:id',tokenVerification,imagesController.delete);


export default route;