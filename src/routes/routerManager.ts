
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
import qualificationRouter from "./qualification.route"
import subjectDictationRouter from "./subjectDictation.route"
import finalExamRegistrationRouter from "./finalExamRegistration.route"
import correlativityRouter from "./correlativity.route"
import courseRegistrationRouter from "./courseRegistration.route"
import classRoomRouter from "./classRoom.route"
import educationalOfferRouter from "./educationalOffer.route"

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
        this.app.use("/api/position", positionRouter)
        this.app.use("/api/studyPlan", studyPlanRouter)
        this.app.use("/api/subject", subjectRouter )
        this.app.use("/api/subjectInfo", subjectInfoRouter)
        this.app.use("/api/positionCategory", positionCategoryRouter)
        this.app.use("/api/qualification", qualificationRouter)
        this.app.use("/api/subjectDictation", subjectDictationRouter)
        this.app.use("/api/finalExamRegistration", finalExamRegistrationRouter)
        this.app.use("/api/correlativity", correlativityRouter)
        this.app.use("/api/courseRegistration", courseRegistrationRouter)
        this.app.use("/api/classRoom", classRoomRouter)
        this.app.use("/api/educationalOffer", educationalOfferRouter)
    }

}