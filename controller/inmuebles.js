const { request, response } = require('express');
const InmuebleModel = require('../models/inmuebles');
const csvtojson = require("csvtojson");
const distance =require('calculate-distance-between-coordinates')
const fastcsv = require("fast-csv");
const createCsvWriter = require('csv-writer').createObjectCsvWriter
const csvWriter = createCsvWriter({
    path: './csvFromMongodb.csv',
    header: ['Latitud,Longitud','_id','Titulo,Anunciante','Descripcion','Reformado','Telefonos','Tipo','Precio','Precio_por_metro','Direccion','Provincia','Ciudad','Metros_cuadrados','Habitaciones','Baños','Parking','Segunda_mano','Armarios_Empotrados','Construido_en','Amueblado','Calefacción_individual','Certificación_energética','Planta,Exterior','Interior','Ascensor','Fecha','Calle','Barrio','Distrito','Terraza','Trastero','Cocina_Equipada','Cocina_equipada','Aire_acondicionado','Piscina,Jardín','Metros_cuadrados_útiles','Apto_para_personas_con_movilidad_reducida','Plantas,Se_admiten_mascotas','Balcón'].map((item) => ({id: item, title: item}))
})
const parsearData = (data)=>{
    return{
        Latitud: parseFloat(data.Latitud),
        Longitud: parseFloat(data.Longitud),
        _id: data._id,
        Titulo: data.Titulo,
        Anunciante: data.Anunciante,
        Descripcion: data.Descripcion,
        Reformado: data.Reformado.toLowerCase() === 'true' ,
        Telefonos: data.Telefonos,
        Tipo: data.Tipo,
        Precio: parseFloat(data.Precio),
        Precio_por_metro: parseFloat(data.Precio_por_metro),
        Direccion: data.Direccion,
        Provincia: data.Provincia,
        Ciudad: data.Ciudad,
        Metros_cuadrados: parseFloat(data.Metros_cuadrados),
        Habitaciones: parseInt(data.Habitaciones) || 0,
        Baños: parseInt(data.Baños),
        Parking: data.Parking.toLowerCase() === 'true',
        Segunda_mano: data.Segunda_mano.toLowerCase() === 'true',
        Armarios_Empotrados: data.Armarios_Empotrados.toLowerCase() === 'true',
        Construido_en: data.Construido_en,
        Amueblado: data.Amueblado.toLowerCase() === 'true',
        Calefacción_individual:data.Calefacción_individual,
        Certificación_energética: data.Certificación_energética,
        Planta: parseInt(data.Planta) || 0,
        Exterior: data.Exterior.toLowerCase() === 'true',
        Interior: data.Interior.toLowerCase() === 'true',
        Ascensor: data.Ascensor.toLowerCase() === 'true',
        Fecha: data.Fecha,
        Calle: data.Calle,
        Barrio: data.Barrio,
        Distrito: data.Distrito,
        Terraza: data.Terraza,
        Trastero: data.Trastero,
        Cocina_Equipada: data.Cocina_Equipada,
        Cocina_equipada: data.Cocina_equipada,
        Aire_acondicionado: data.Aire_acondicionado,
        Piscina: data.Piscina,
        Jardín: data.Jardín,
        Metros_cuadrados_útiles: data.Metros_cuadrados_útiles,
        Apto_para_personas_con_movilidad_reducida: data.Apto_para_personas_con_movilidad_reducida,
        Plantas: data.v,
        Se_admiten_mascotas: data.Se_admiten_mascotas,
        Balcón: data.Balcón
    }
}

const crear = async (req = request, res = response)=>{
    csvtojson()
    .fromFile("resource_accommodation.csv")
    .then(async (csvData)=> { 
        //console.log(csvData);
        for(let i = 0; i<csvData.length; i++ ){
            const inmuebleParse = parsearData(csvData[i])
            const inmueble = new InmuebleModel(inmuebleParse)      
            const resultado = await inmueble.save()
        }
        console.log("Se Agregaron los datos")
        res.json("Se Agregaron los datos")
    });
    
}


const mostrar = async (req = request, res = response)=>{
    const inmueble = await InmuebleModel.find()
    console.log(inmueble)
    res.json(inmueble)
}

const mostrar_filtro = async (req, res) => {
   // console.log(req)
    const {Habitaciones,precioMax,precioMin} = req.query;
    //console.log(Habitaciones,precioMax,precioMin)
    const brand = await InmuebleModel.find({
        Precio:{
            $gte:precioMin,
            $lte: precioMax
        },
        Habitaciones:{
            $eq:Habitaciones
        }
    });
    res.json(brand);
};


const mostrar_distancia = async (req = request, res = response)=>{
    const inmueble = await InmuebleModel.find()
    const {Latitud,Longitud,distancia} = req.query;
    const respuesta = []
    inmueble.forEach(element => {
        const km = distance.getDistanceBetweenTwoPoints(
            {
                lat: Latitud,
                lon: Longitud,
             },
            {
                lat: element.Latitud,
                lon: element.Longitud,
            }  )
            if(km <= distancia) respuesta.push(element.Precio_por_metro)
       //console.log(element.Latitud)
    });
    let sum = 0;
    var b = respuesta.length ;
    for (let i = 0; i < respuesta.length; i++) {
         sum = (sum + respuesta[i]);}
         let respuestaprom = (sum/respuesta.length);
         if (respuesta.length=0)
         {res.json("precio promedio del metro cuadrado: 0")}
         else{
            res.json("precio promedio del metro cuadrado: " + respuestaprom)
         }
}

const crearCsv = async (req = request, res = response)=>{    
   // const fs = require("fs");
   // const ws = fs.createWriteStream("mongodb_fastcsv.csv");
    const {Habitaciones,precioMax,precioMin} = req.query;
    //console.log(Habitaciones,precioMax,precioMin)
    const brand = await InmuebleModel.find({
        Precio:{
            $gte:precioMin,
            $lte: precioMax
        },
        Habitaciones:{
            $eq:Habitaciones
        }
    });
    //const parseData = JSON.parse(brand);
    try {         
        await csvWriter.writeRecords(brand)        
        res.json("Se genero el archivo csvFromMongodb.csv")
    } catch(error) {
        console.log(error);
    }
    
}



module.exports = {
    crear,
    mostrar,
    mostrar_filtro,
    mostrar_distancia,
    crearCsv
}