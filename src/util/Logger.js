/**
 * Logger utility for logging messages with different severity levels. 
 * 
 * @author Izemmouren Ilyes
 * @version 1.0
 * @description This utility provides methods to log messages with different severity levels (ERROR, WARN, INFO, DEBUG, FATAL). 
 * 
 */
const Logger = {

    levels: {
        ERROR: 'ERROR',
        WARN: 'WARN',
        INFO: 'INFO',
        DEBUG: 'DEBUG',
        FATAL: 'FATAL',
    },

    log(level, component, func, message){
        const timestamp = new Date().toISOString();
        const formattedMessage = `[${timestamp}] [${level}] [${component}] [${func}] ${message}`;

        switch (level) {
            case this.levels.ERROR:
                console.error(formattedMessage);
                break;
            case this.levels.WARN:
                console.warn(formattedMessage);
                break;
            case this.levels.INFO:
                console.info(formattedMessage);
                break;
            case this.levels.DEBUG:
                console.debug(formattedMessage);
                break;
            case this.levels.FATAL:
                console.error(formattedMessage);
                //TODO: Add additional handling for FATAL errors, such as sending alerts or notifications
                break;
            default:
                console.log(formattedMessage);
        }
    },

    info(component, func, message) {
    this.log(this.levels.INFO, component, func, message);
    },

    warn(component, func, message) {
        this.log(this.levels.WARN, component, func, message);
    },

    error(component, func, message) {
        this.log(this.levels.ERROR, component, func, message);
    },

    fatal(component, func, message) {
        this.log(this.levels.FATAL, component, func, message);
    },
}

export default Logger;