// Wraps async controllers to handle errors automatically.
export function asyncHandler(controller) {
  // Returns an Express middleware.
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error); // Forward error to global handler
    }
  };
}