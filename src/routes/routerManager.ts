
import { Application } from "express"
import universityRouter from "./university.route"
import studentRouter from "./student.route"
import cityRouter from "./city.route"
import facultyRouter from "./faculty.route"

export class RouterManager {

    private readonly app : Application

    constructor(app : Application){
        this.app = app
    }

    public loadRoutes() : void {
        this.app.use("/api/university", universityRouter)
        this.app.use("/api/student", studentRouter)
        this.app.use("/api/city", cityRouter)
        this.app.use("/api/faculty", facultyRouter)
    }

}