import express from 'express';
import colors from 'colors';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec, { swaggerUiOptions } from './config/swagger';
import router from './router';
import db from './config/db';

// Connect to database
export async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        //console.log(colors.blue('Conexion Exitosa a la base de datos'));
    } catch (error) {
        // console.log(error);
        console.log(colors.red.bold('Error al conectar a la base de datos'));
    }
}

connectDB();

// Instabcia de Express
const server = express();

// Configuración de CORS
const corsOptions: CorsOptions = {
    origin: function(origin, callback) {
        if (origin === process.env.FRONTEND_URL) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
}
server.use(cors(corsOptions));

// Leer Datos de Formulario
server.use(express.json());

// Morgan
server.use(morgan('dev'));

server.use('/api/products', router);

// Docs
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUiOptions));

export default server;