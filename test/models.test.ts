
import { FacultyModel } from "../src/models/faculty"
import { prismaMock } from "../src/config/singleton"


describe("Faculty Model tests", () => {

    let model = new FacultyModel(prismaMock)

    test("should get all faculties", async () => {
       
        const registers = [
            {
                id: 1,
                name: 'Facultad Regional San Rafael',
                code: 1234,
                city: "San Rafael",
                zip_code: "M5600",
                street: "Urquiza",
                number: 400,
                description: null,
                web: null,
                email: "frsr@utn.edu.ar", 
                phone: BigInt(2604508090),
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date)
            }
        ]

        prismaMock.faculty.findMany.mockResolvedValue(registers)
        
        const result = await model.getAllFaculties()
        
        expect(result).toEqual(registers)
        
        expect(prismaMock.faculty.findMany).toHaveBeenCalled();
    })


    test('should create new faculty with correct information', async () => {

        const inputFaculty = {
            name: 'Facultad Regional Mendoza',
            code: 1200,
            city: "Mendoza",
            zip_code: "M5500",
            street: "San Martin",
            number: 500,
            description: null,
            web: null,
            email: "frm@utn.edu.ar", 
            phone: BigInt(2614508090),
        }

        const savedFaculty = {
            id: 1,
            ...inputFaculty,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }
    
        prismaMock.faculty.create.mockResolvedValue(savedFaculty)

        const result = await model.createFaculty(inputFaculty)
        
        expect(result).toEqual(savedFaculty);
        
        expect(prismaMock.faculty.create).toHaveBeenCalledWith({
            data: inputFaculty
        })

    })


    test('should update a faculty data', async () => {

        const id = 1

        const inputFaculty = {
            email: "frm@utn.edu.ar", 
        }

        const updatedFaculty = {
            id: 1,
            name: 'Facultad Regional Mendoza',
            code: 1200,
            city: "Mendoza",
            zip_code: "M5500",
            street: "San Martin",
            number: 500,
            description: null,
            web: null,
            email: "frm@utn.edu.ar", 
            phone: BigInt(2614508090),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }
    
        prismaMock.faculty.update.mockResolvedValue(updatedFaculty)
        
        const result = await model.updateFaculty(id, inputFaculty)
        
        expect(result).toEqual(updatedFaculty)
        
        expect(prismaMock.faculty.update).toHaveBeenCalledWith({
            data: inputFaculty,
            where: {id: id}
        })

    })


    test('should delete a faculty', async () => {

        const id = 1

        const deleteFaculty = {
            id: 1,
            name: 'Facultad Regional Mendoza',
            code: 1200,
            city: "Mendoza",
            zip_code: "M5500",
            street: "San Martin",
            number: 500,
            description: null,
            web: null,
            email: "frm@utn.edu.ar", 
            phone: BigInt(2614508090),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }
    
        prismaMock.faculty.delete.mockResolvedValue(deleteFaculty)

        const result = await model.deleteFaculty(id)
        
        expect(result).toEqual(deleteFaculty)
        
        expect(prismaMock.faculty.delete).toHaveBeenCalledWith({
            where: {id: id}
        })

    })


})