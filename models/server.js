//Librerías necesarias para nuestro servidor
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    // Configuración inicial de nuestro servidor
    constructor() {
        // Conexión con la base de datos
        dbConnection();

        // Iniciar librería express
        this.app = express();
        this.port = 3800;
        this. inmueblePath = '/inmuebles';

        this.app.use(cors({
            origin: true,
            optionsSuccessStatus: 200
        }));

        this.app.use(express.json({
            limit: '10mb',
            extend: true
        }));

        this.app.use(express.urlencoded({
            limit: '10mb',
            extended: true
        }));

        this.routes();
    }

    // Rutas para manejar la información
    routes(){
        this.app.use(this. inmueblePath, require('../routes/inmuebles'));
    }

    // Función para que el servidor inicie a escuchar
    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor ejecutandose en el puerto: ', this.port);
        });
    }
}

module.exports = Server;