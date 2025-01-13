import 'dotenv/config';

import bodyParser from 'body-parser';
import dbClient from './config/dbClient';
import express  from "express";
import routesMascotas from '../src/routes/mascotas-route';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/mascotas', routesMascotas )


try {
    const PORT = process.env.PORT || 3000
    app.listen(PORT, ()=> console.log('servidor en el puerto' + PORT))
} catch (error) {
    console.log(error)
}

process.on('SIGINT',async()=> {
    dbClient.disconectDataBase();
    process.exit(0);
});