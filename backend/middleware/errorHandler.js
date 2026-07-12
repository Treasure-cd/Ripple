import logger from "./logger.js";

const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let finalMessage = err.message || 'Internal Server Error';
    
    logger.error(`${statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    if (err.stack) logger.error(err.stack);

    if (err.message && err.message.includes("FOREIGN KEY constraint failed")) {
        statusCode = 400;
        finalMessage = "Invalid reference: The item you are trying to link to does not exist.";
    }

    res.status(statusCode).json({
        success: false,
        error: {
            message: finalMessage, 
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined 
        }
    });
};

export default errorHandler;