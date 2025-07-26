
import { Application } from "express"
import certifcateRouter from "./certificate.route"
import universityRouter from "./university.route"
import studentRouter from "./student.route"
import cityRouter from "./city.route"
import facultyRouter from "./faculty.route"
import careerRouter from "./career.route"
import authRouter from "./auth.route"





import subjectInfoRouter from "./subjectInfo.route"

export class RouterManager {

    private readonly app : Application

    constructor(app : Application){
        this.app = app
    }

    public loadRoutes() : void {
        this.app.use("/certificate", certifcateRouter)
        this.app.use("/api/university", universityRouter)
        this.app.use("/api/student", studentRouter)
        this.app.use("/api/city", cityRouter)
        this.app.use("/api/faculty", facultyRouter)
        this.app.use("/api/career", careerRouter)
        this.app.use("/api/auth", authRouter)
        this.app.use("/api/subjectInfo", subjectInfoRouter)
    }

}