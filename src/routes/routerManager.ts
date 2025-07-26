
import { Application } from "express"
import certifcateRouter from "./certificate.route"
import universityRouter from "./university.route"
import studentRouter from "./student.route"
import cityRouter from "./city.route"
import facultyRouter from "./faculty.route"
import careerRouter from "./career.route"
import authRouter from "./auth.route"
import authorityRouter from "./authority.route"
import finalExamRouter from "./finalExam.route"
import positionRouter from "./position.route"
import studyPlanRouter from "./studyPlan.route"
import subjectRouter from "./subject.route"
import subjectInfoRouter from "./subjectInfo.route"




import positionCategoryRouter from "./positionCategory.route"

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
        this.app.use("/api/authority", authorityRouter)
        this.app.use("/api/finalExam", finalExamRouter)
    }

}