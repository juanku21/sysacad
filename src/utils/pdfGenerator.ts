
import fs from 'fs/promises'
import Handlebars from 'handlebars'
import puppeteer, { Browser } from 'puppeteer'
import path from 'path'
import { RegularCertificateInput } from '../types'

class TempleteHTML {

    public static render = async (title : string, data : object) : Promise<string> => {

        try {

            const basePath = path.join(__dirname).split(path.sep).slice(0, -1)
            basePath.push('views')

            const pathFile = path.join(...basePath, title)
            const templateSource = await fs.readFile(pathFile, 'utf8')
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

