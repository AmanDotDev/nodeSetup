import responseMessage from '../constant/responseMessage'
import { THttpError } from '../types/types'
import { Request } from 'express'
import config from '../config/config'
import { EApplicationEnvironment } from '../constant/application'

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export default (err: Error | unknown, req: Request, errorStattusCode: number = 500): THttpError => {
    const errorObj: THttpError = {
        success: false,
        statusCode: errorStattusCode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.originalUrl
        },
        message: err instanceof Error ? err.message || responseMessage.SOMETHING_WENT_WRONG : responseMessage.SOMETHING_WENT_WRONG,
        data: null,
        trace: err instanceof Error ? { error: err.stack } : null
    }

    // eslint-disable-next-line no-console
    console.error(`CONTROLLER_RESPONSE`, {
        meta: errorObj
    })

    // production env check
    if (config.ENV == EApplicationEnvironment.PRODUCTION) {
        delete errorObj.request.ip
        delete errorObj.trace
    }

    return errorObj
}
