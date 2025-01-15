export const errorHandler = (err, req, res, next) => {
    console.error(err.message);

    const errorResponse = {
        status: 'error',
        message: err.message || 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    };

    res.status(err.status || 500).json(errorResponse);
};