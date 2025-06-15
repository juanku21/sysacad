
import { Application } from "express"
import universityRouter from "./university.route"

export class RouterManager {

    private readonly app : Application

    constructor(app : Application){
        this.app = app
    }

    public loadRoutes() : void {
        this.app.use("/api/university", universityRouter)
    }

}