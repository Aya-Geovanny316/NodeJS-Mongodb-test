const mongoose = require('mongoose');
const csvtojson = require("csvtojson");

const MONGODB_URI = 'mongodb://127.0.0.1:27017/inmuebles_db'

mongoose.connect(MONGODB_URI,{

})

.then(()=> console.log('Conectado'))
.catch((e)=> console.log('Error de Conexion'+ e))

