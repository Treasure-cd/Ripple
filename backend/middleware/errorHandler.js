import logger from "./logger.js";

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    
    logger.error(`${statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    if (err.stack) logger.error(err.stack);

    res.status(statusCode).json({
        success: false,
        error: {
            message: err.message || 'Internal Server Error',
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined 
        }
    });
};

export default errorHandler;