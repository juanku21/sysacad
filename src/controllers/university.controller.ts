
import { Request, Response } from "express";
import { UniversityService } from "../services/university.service";

export class UniversityController {

    public static async get(req : Request, res : Response) {
        try {
            const result = await UniversityService.get()
            res.status(200).json(result)
        }
        catch (error) {
            res.status(503).json({error: `${error}`})
        }
    }

    public static async getById(req : Request, res : Response) {

    }

    public static async create(req : Request, res : Response) {

    }

    public static async update(req : Request, res : Response) {

    }

    public static async delete(req : Request, res : Response) {

    }

}