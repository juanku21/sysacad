
import { Server } from "http"
import express, { Application } from "express"
import config from "./config/config"
import compression from 'compression'
import { Sanitizer } from "./middlewares/sanitizer"
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import { RouterManager } from "./routes/routerManager"


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

    // aplicación del patrón de diseño singleton (una única instancia)

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

    private middlewares() : void {
        this.app.use(compression())
        this.app.use(express.json())
        this.app.use(Sanitizer.xss)
        this.app.use(rateLimit(config.RateLimit))
        this.app.use(helmet(config.Helmet))
    }

    private routes() : void {
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