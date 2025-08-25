
import fs from 'fs/promises'
import Handlebars from 'handlebars'
import puppeteer, { Browser } from 'puppeteer'
import path from 'path'
import { RegularCertificateInput } from '../types'


const getRootPathArray = () => path.join(__dirname).split(path.sep).slice(0, -2)


class TempleteHTML {

    public static render = async (title : string, data : object) : Promise<string> => {

        try {

            const rootPath = path.join(__dirname).split(path.sep).slice(0, -2)

            let viewsPath = rootPath
            viewsPath.push('src', 'views')

            const pathFile = path.join(...viewsPath, title)
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

            // obtenemos la ruta de la imagen como buffer binario y lo codificamos en base64
            let logoUtnPath = getRootPathArray()
            logoUtnPath.push('public', 'img', 'logo-utn.png')
            const imgLogoUtn = (await fs.readFile(path.join(...logoUtnPath))).toString('base64')

            // obtenemos la ruta de la imagen como buffer binario y lo codificamos en base64
            let logoMinisterioPath = getRootPathArray()
            logoMinisterioPath.push('public', 'img', 'logo-ministerio.png')
            const imgLogoMinisterio = (await fs.readFile(path.join(...logoMinisterioPath))).toString('base64')


            // cargamos las imágenes y el resto de la información en nuestra plantilla de handlebars
            const htmlContent = await TempleteHTML.render('regularCertificate.hbs', {
                ...studentData,
                logoUtnSrc: imgLogoUtn,
                logoMinisterioSrc: imgLogoMinisterio
            })


            // Generamos el archivo PDF con la ayuda de la librería puppeteer
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


