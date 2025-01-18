import 'dotenv/config';

import bodyParser from 'body-parser';
import cors from 'cors';
import dbClient from './config/dbClient';
import dotenv from 'dotenv';
import express  from "express";
import routesImages  from './routes/images.route';
import routesUsers from './routes/users.route';

const app = express();
const Cors = cors();
dotenv.config();

app.use(cors({
    origin: 'http://localhost:4200', // Solo permite solicitudes desde tu front-end
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));


app.use('/images', routesImages  )
app.use('/users', routesUsers )

const PORT = process.env.PORT || 3000

dbClient.connectDataBase().then(() => {
    app.listen(PORT, () => console.log(`Servidor en el puerto ${PORT}`));
}).catch(error => {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1);
});

process.on('SIGINT',async()=> {
    dbClient.disconectDataBase();
    process.exit(0);
});