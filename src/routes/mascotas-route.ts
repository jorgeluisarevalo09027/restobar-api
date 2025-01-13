import express from 'express';
import mascotasController from '../controllers/mascota-controller'

const route = express.Router();

route.get('/',mascotasController.getAll);
route.post('/',mascotasController.create);
route.get('/:id',mascotasController.getOne);
route.put('/:id',mascotasController.update);
route.delete('/:id',mascotasController.delete);


export default route;