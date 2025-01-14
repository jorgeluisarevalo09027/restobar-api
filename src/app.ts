import 'dotenv/config';

import bodyParser from 'body-parser';
import dbClient from './config/dbClient';
import dotenv from 'dotenv';
import express  from "express";
import routesImages  from './routes/images-route';
import routesUsers from '../src/routes/users-route';

const app = express();
dotenv.config();

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