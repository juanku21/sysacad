

import express, { Application } from "express"
import { RouterManager } from "./routes/routerManager"
import config from "./config/config"
import compression from 'compression'

export class Server {

    private static instance : Server

    private readonly app : Application
    private readonly port : string

    private constructor(){
        this.app = express()
        this.port = config.PORT
        this.middlewares()
        this.routes()
    }

    // aplicación del patrón de diseño singleton (una única instancia)

    public static getInstance() : Server {

        if (!Server.instance) {
            this.instance = new Server()
        }

        return this.instance

    }
    
    public getApp() : Application {
        return this.app
    }

    public start() : void {
        this.app.listen(this.port, () => {
            console.log("Servidor ejecuntandose correctamente")
        })
    }

    public middlewares() : void {
        this.app.use(compression())
        this.app.use(express.json())
    }

    public routes() : void{
        // this.app.use(handleErrorMiddlewere)

        const manager = new RouterManager(this.app)
        manager.loadRoutes()
    }

}

const server = Server.getInstance()
server.start()
