 
import app from './app'
import config from './config/config'
import logger from './util/logger'

const server = app.listen(config.PORT)

;(() => {
    try {
        // DatabaseConnection
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
