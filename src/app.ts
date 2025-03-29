import express, { Application, NextFunction, Request, Response } from 'express'
import path from 'path'
import router from './router/apiRouter'
import globlaErrorHandler from './middleware/globlaErrorHandler'
import httpError from './util/httpError'
import responseMessage from './constant/responseMessage'
import helmet from 'helmet'

const app: Application = express()

// Middleware
app.use(helmet())
app.use(express.json())
app.use(express.static(path.join(__dirname, '../', 'public')))
// Routes
app.use('/api/v1/', router)

// 404 Handler
app.use((req: Request, _: Response, next: NextFunction) => {
    try {
        throw new Error(responseMessage.NOT_FOUND('Route'))
    } catch (error) {
        httpError(next, error, req, 404)
    }
})

// global error handler
app.use(globlaErrorHandler)
export default app
