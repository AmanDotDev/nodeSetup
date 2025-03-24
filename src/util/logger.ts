import { createLogger, format, transports } from 'winston'
import { ConsoleTransportInstance, FileTransportInstance } from 'winston/lib/winston/transports'
import util from 'util'
import config from '../config/config'
import { EApplicationEnvironment } from '../constant/application'
import path from 'path'
import * as sourceMapSupport from 'source-map-support'

//linking Trace Support
sourceMapSupport.install()

const consoleLogFormat = format.printf((info) => {
    const { level, message, timestamp, meta = {} } = info
    const customLevel = level.toLocaleLowerCase()
    const customTimeStamp = String(timestamp)
    const customMessage = String(message)
    const customMeta = util.inspect(meta, {
        showHidden: false,
        depth: null
    })
    const customLog = `${customLevel} [${customTimeStamp}] ${customMessage}\n${'META'} ${customMeta}`
    return customLog
})

const consoleTransport = (): Array<ConsoleTransportInstance> => {
    return config.ENV === EApplicationEnvironment.DEVELOPMENT
        ? [new transports.Console({ level: 'info', format: format.combine(format.timestamp(), consoleLogFormat) })]
        : []
}

const fileLogFormat = format.printf((info) => {
    const {
        level,
        message,
        timestamp,
        meta = {}
    } = info as {
        level: string
        message: string
        timestamp: string | number
        meta?: Record<string, unknown>
    }
    const logMeta: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(meta)) {
        if (value instanceof Error) {
            logMeta[key] = {
                name: value.name,
                message: value.message,
                trace: value.stack || ''
            }
        } else {
            logMeta[key] = value
        }
    }
    const logData = {
        level: level.toUpperCase(),
        message,
        timestamp,
        meta: logMeta
    }

    return JSON.stringify(logData, null, 4)
})

const fileTransport = (): Array<FileTransportInstance> => {
    return [
        new transports.File({
            filename: path.join(__dirname, '../', '../', 'logs', `${config.ENV}.log`),
            level: 'info',
            format: format.combine(format.timestamp(), fileLogFormat)
        })
    ]
}

export default createLogger({
    defaultMeta: {
        meta: {}
    },
    transports: [...fileTransport(), ...consoleTransport()]
})
