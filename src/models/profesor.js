import {Schema, model} from 'mongoose'
import bcrypt from 'bcryptjs';

const profesorSchema = new Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    apellido:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    telefono:{
        type: String,
        required: true,
        trim: true
    },
    direccion:{
        type: String,
        required: true,
        trim: true
    },
    estado:{
        type: Boolean,
        default: true
    },
    token:{
        type: String,
        default: null
    },
    confirmEmail:{
        type: Boolean,
        default: false
    }, 
    admin:{
        type: Schema.Types.ObjectId,
        ref: 'admin'
    }
},{
    timestamps: true,
    collection: 'profesores'
})

//Metodo para encriptar la contraseña
profesorSchema.methods.encriptarPassword = async password => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

//Metodo para comparar la contraseña
profesorSchema.methods.compararPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

profesorSchema.methods.generarPassword = async function() {
    const password = Math.random().toString(36).slice(2,7)
    return `prof-${password}`
}

profesorSchema.methods.generarToken = async function() {
    const token = Math.random().toString(36).slice(2)
    this.token = token
    return token
}

export default model('profesor', profesorSchema)