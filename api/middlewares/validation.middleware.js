
//ici on Ajoute la vraie validation Joi dans le middleware pour vérifier la validité des info dans req.body, et donc:
// pour empêcher les données invalides d’entrer dans le controller.

export function validateBody(schema) {
    return (req, res, next) => {
      const { error, value } = schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
  
      if (error) {
        return res.status(400).json({
          error: error.details.map((detail) => detail.message),
        });
      }
  
      req.body = value;
      next();
    };
  }