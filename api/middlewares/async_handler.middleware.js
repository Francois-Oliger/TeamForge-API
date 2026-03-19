
//ici on créé un wrap qui vas gérer les try catch de nos controller


//On crée et on exporte une fonction nommée asyncHandler qui reçoit en paramètre "controller", donc une fonction controller.
export function asyncHandler(controller) {
    //asyncHandler retourne une nouvelle fonction middleware Express.
    return async (req, res, next) => {
        //On commence un bloc de tentative. (On dit en gros : “essaie d’exécuter ce qui suit”.)
      try {
        //On exécute le controller qu’on a reçu en paramètre.
        await controller(req, res, next);
        // Si une erreur se produit dans le controller, on arrive ici.
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
    };
  }