//Requerir los modulos
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import adminRouter from './routers/admin_routes.js'
import profesorRouter from './routers/profesor_routes.js'
import representanteRouter from './routers/representante_routes.js'
import publicRouter from './routers/common_routes.js'
import multer from 'multer';

//inicializadores
const app = express()
dotenv.config()
const upload = multer()

//Configuraciones
app.set('port', process.env.PORT || 3000)
app.use(cors())
app.use(upload.none())
//middleware
app.use(express.json())

//Rutas
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Escuela Descubrir</title>
        </head>
        <body>
            <p>El servidor de la aplicación para la gestión de notas de la Escuela Descubrir está en línea</p>
        </body>
        </html>
    `);
});

app.use('/api/', publicRouter)

app.use('/api/', adminRouter)

app.use('/api/', profesorRouter)

app.use('/api/', representanteRouter)

app.use((req, res) => {
    res.status(404).json({error: 'Ruta no encontrada'})
})

// Exportar la instancia de express por medio de app
export default app