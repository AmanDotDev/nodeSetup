import DotenvFlow from 'dotenv-flow'

DotenvFlow.config() //pick env
export default {
    //General
    ENV: process.env.ENV,
    PORT: process.env.PORT,
    SERVER_URL: process.env.SERVER_URL,
    // Database
    DATABASE_URL: process.env.DATABASE_URL
}
