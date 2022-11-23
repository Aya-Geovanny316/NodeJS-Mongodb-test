const { Schema, model } = require('mongoose');

const inmuebles = new Schema({
  Latitud: {
    type:String
    },
  Longitud: {
    type:String
    },
  _id: {
    type:String
    },
  Titulo: {
    type:String
    },
  Anunciante: {
    type:String
    },
  Descripcion: {
    type:String
    },
  Reformado: {
    type:Boolean
    },
  Telefonos: {
    type:String
    },
  Tipo: {
    type:String
    },
  Precio: {
    type:Number
    },
  Precio_por_metro: {
    type:Number
    },
  Direccion: {
    type:String
    },
  Provincia: {
    type:String
    },
  Ciudad: {
    type:String
    },
  Metros_cuadrados: {
    type:Number
    },
  Habitaciones: {
    type:Number
    },
  Baños: {
    type:Number
    },
  Parking: {
    type:Boolean
    },
  Segunda_mano: {
    type:Boolean
    },
  Armarios_Empotrados: {
    type:Boolean
    },
  Construido_en: {
    type:String
    },
  Amueblado: {
    type:Boolean
    },
  Calefacción_individual: {
    type:String
    },
  Certificación_energética: {
    type:String
    },
  Planta: {
    type:Number
    },
  Exterior: {
    type:Boolean
    },
  Interior: {
    type:Boolean
    },
  Ascensor: {
    type:Boolean
    },
  Fecha: {
    type:String
    },
  Calle: {
    type:String
    },
  Barrio: {
    type:String
    },
  Distrito: {
    type:String
    },
  Terraza: {
    type:String
    },
  Trastero: {
    type:String
    },
  Cocina_Equipada: {
    type:String
    },
  Cocina_equipada: {
    type:String
    },
  Aire_acondicionado: {
    type:String
    },
  Piscina: {
    type:String
    },
  Jardín: {
    type:String
    },
  Metros_cuadrados_útiles: {
    type:String
    },
  Apto_para_personas_con_movilidad_reducida: {
    type:String
    },
  Plantas: {
    type:String
    },
  Se_admiten_mascotas: {
    type:String
    },
  Balcón: {
    type:String
    }
},{versionKey:false});

module.exports = model('inmueble', inmuebles);