// Global error handler.
export function errorHandler(err, req, res, next) {
    console.error(err); // Log for debugging
  
    // Default values
    const status = err.status || 500;
    const error = err.code || "INTERNAL_SERVER_ERROR";
  
    res.status(status).json({ error });
  }