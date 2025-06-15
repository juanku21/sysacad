
import { Server } from "http"
import express, { Application } from "express"
import { RouterManager } from "./routes/routerManager"
import config from "./config/config"
import compression from 'compression'

export class ServerHTTP {

    private static instance : ServerHTTP
    server : Server
    private readonly app : Application
    private readonly port : string

    private constructor(){
        this.app = express()
        this.port = config.PORT
        this.middlewares()
        this.routes()
    }

    // // aplicación del patrón de diseño singleton (una única instancia)

    public static getInstance() : ServerHTTP {

        if (!ServerHTTP.instance) {
            this.instance = new ServerHTTP()
        }

        return this.instance

    }
    
    public getApp() : Application {
        return this.app
    }

    public start() : void {
        if (!this.server) {
            this.server = this.app.listen(this.port, () => {
                console.log("Servidor ejecuntandose correctamente")
            })
        }
    }

    public middlewares() : void {
        this.app.use(compression())
        this.app.use(express.json())
    }

    public routes() : void {
        // this.app.use(handleErrorMiddlewere)

        const manager = new RouterManager(this.app)
        manager.loadRoutes()
    }

    public stop() : void {
        if (this.server) {
            this.server.close()
        }
    }

}

const server = ServerHTTP.getInstance()
server.start()


setTimeout(() => {
    server.stop()
}, 5000)