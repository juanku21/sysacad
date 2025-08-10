
import dotenv from "dotenv"

dotenv.config()

if (!process.env.JWT_SECRET || !process.env.SQIDS_ALPHABET || !process.env.SQIDS_MIN_LENGTH) {
    console.error("Error crítico: La firma digital para autenticación o los datos de hasheo no se encuentran definidos")
    process.exit(1)
}


interface ConfigI {
    PORT : string
    JWT_SECRET : string
    squids: {
        alphabet: string,
        minLength: number
    },
    Helmet : object
    RateLimit : object
}

const config : ConfigI = {

    PORT: process.env.PORT || "3000",
    JWT_SECRET: process.env.JWT_SECRET,
    squids: {
        alphabet: process.env.SQIDS_ALPHABET,
        minLength: parseInt(process.env.SQIDS_MIN_LENGTH)
    },
    Helmet: {
        contentSecurityPolicy: { // Configura CSP
            directives: {
            defaultSrc: ["'self'"], // Solo permite recursos de tu propio dominio
            scriptSrc: ["'self'"], // Permite scripts de tu dominio y un CDN específico
            }
        },
        xXssProtection: true, // protección XSS del navegador 
        frameguard: { action: 'deny' }, // Asegura que tu página no pueda ser incrustada en un frame
    },
    RateLimit: {
        windowMs: 15 * 60 * 1000,
        max: 100
    }
    
}

export default config