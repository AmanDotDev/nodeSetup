import app from './app'
import config from './config/config'
import databaseService from './service/databaseService'
import logger from './util/logger'

const server = app.listen(config.PORT)

// eslint-disable-next-line @typescript-eslint/no-floating-promises
;(async () => {
    try {
        // DatabaseConnection
        const connection = await databaseService.connect()

        logger.info(`-- DATABASE_CONNECTION`, {
            meta: {
                CONNECTION_NAME: connection.name
            }
        })

        logger.info(`-- APPLICATION_STARTED`, {
            meta: {
                PORT: config.PORT,
                SERVER_URL: config.SERVER_URL
            }
        })
    } catch (error) {
        logger.error(`APPLICATION_STARTED`, { meta: error })

        server.close((error) => {
            if (error) {
                logger.error(`APPLICATION_STARTED`, { meta: error })
            }

            process.exit(1)
        })
    }
})()
