
import fs from 'fs/promises'
import Handlebars from 'handlebars'
import puppeteer, { Browser } from 'puppeteer'
import { RegularCertificateInput } from '../types'

class TempleteHTML {

    public static render = async (title : string, data : object) : Promise<string> => {

        try {

            const path = `../views/${title}`
            const templateSource = await fs.readFile(path, 'utf8')
            const template = Handlebars.compile(templateSource)
            const htmlContent = template(data)

            return htmlContent
        } 
        catch (error : any) {
            throw new Error(`${error.message}`)
        }

    }

}


export class PDFGenerator {

    public static regularCertificate = async (studentData : RegularCertificateInput) : Promise<Uint8Array<ArrayBufferLike>> => {

        let browser : Browser

        try {
            const htmlContent = await TempleteHTML.render('regularCertificate.hbs', studentData)
            browser = await puppeteer.launch({ headless: true })
            const page = await browser.newPage()
            await page.setContent(htmlContent, { waitUntil: 'networkidle0' })

            const pdfBuffer = await page.pdf({
                format: 'A4',
                printBackground: true,
                margin: {
                    top: '40px',
                    right: '40px',
                    bottom: '40px',
                    left: '40px'
                }
            })

            return pdfBuffer

        } 
        catch (error : any) {
            throw new Error(`${error.message}`)
        }

    }

}