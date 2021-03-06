/**
 * Created by mmerida on 17/05/2018.
 */
var mongoose = require('mongoose');

var ParticipaSchema = new mongoose.Schema({
    idevento: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: false
    },
    genero: {
        type: String,
        required: false
    },
    edad: {
        type: String,
        required: false
    },
    correo: {
        type: String,
        required: false
    },
    telefono: {
        type: String,
        required: false
    },
    unidad: {
        type: String,
        required: false
    } ,
    otros: {
        type: String
    },
    estado: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Participa', ParticipaSchema);