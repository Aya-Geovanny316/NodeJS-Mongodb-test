const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/inmuebles_db', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Base de datos conectada');
    } catch (err) {
        console.log(err);
        throw new Error('Error al conectar con la base de datos');
    }
}

module.exports = {
    dbConnection
}