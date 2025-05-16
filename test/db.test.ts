
import prisma from "../src/config/client"

describe("Database conecction Test", () => {

    test("Database should be connected", async () => {

        try {
            await prisma.$connect()
            expect(true).toBe(true)
        } 
        catch (error) {
            throw new Error(`Database is not connected: ${error}`)
        }
        finally {
            await prisma.$disconnect()
        }

    })

})