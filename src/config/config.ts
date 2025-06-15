
import dotenv from "dotenv"

dotenv.config()

interface ConfigI {
    PORT : string
}

const config : ConfigI = {
    PORT: process.env.PORT || "3000"
}

export default config