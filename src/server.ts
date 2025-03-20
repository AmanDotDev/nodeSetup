/* eslint-disable no-console */
import app from './app'
import config from './config/config'

const server = app.listen(config.PORT)

;(() => {
    try {
        // DatabaseConnection
        console.info(`-- APPLICATION_STARTED`, {
            meta: {
                PORT: config.PORT,
                SERVER_URL: config.SERVER_URL
            }
        })
    } catch (error) {
        console.error(`APPLICATION_STARTED`, { meta: error })

        server.close((error) => {
            if (error) {
                console.error(`APPLICATION_STARTED`, { meta: error })
            }

            process.exit(1)
        })
    }
})()
