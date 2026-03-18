//On importe le modèle Sequelize.
import { Team } from "../models/index.js";




export async function findTeam(req, res, next) {
//On récupère l’identifiant dans l’URL.
    const id = req.params.id || req.params.teamId;
    
    if (isNaN(id)) {
      return res.status(400).json({ error: "teamId doit être un nombre" });
  }

    // On cherche la team en base.
    const team = await Team.findByPk(id);

    if (!team) {
        return res.status(404).json({ error: "Aucune team trouvée" });
    }
//On stocke la team pour les étapes suivantes (on va s'en servir dans le mcontroller pour simplifier et justement nous servir de ce middleware).
    req.team = team;

    next();
}




export function validateCreateTeam(req, res, next) {
    const { name, user_id } = req.body;
    // ici on vérifie qu'il y ait bien un nom et un id dans la requette comme exigé par le model.  
    if (!name || !user_id) {
      return res.status(400).json({ error: "Requete non valide, veuillez vérifier les champs" });
    } 
    //ici on vérifie que name ne soit pas un espace vide et que l'id soit un nombre. 
    if (name.trim() === "" || isNaN(user_id)) {
      return res.status(400).json({ error: "Requete non valide, veuillez vérifier les champs" });
    }  
    next();
  }





  export function validateUpdateTeam(req, res, next) {
    const { name, user_id } = req.body;  
    // au moins un champ doit être présent
    if (!name && !user_id) {
      return res.status(400).json({ error: "Requete non valide, veuillez vérifier les champs" });
        }  
    // si name est présent → pas vide
    if (name && name.trim() === "") {
      return res.status(400).json({ error: "Le nom ne peut pas être vide" });
    }  
    // si user_id est présent → doit être un nombre
    if (user_id && isNaN(user_id)) {
      return res.status(400).json({ error: "user_id doit être un nombre" });
    }  
    next();
  }


  //ici on vérifie que la team chargée dans req.team appartient bien à l’utilisateur connecté.

export function checkTeamOwner (req, res, next) {
  if (req.user.userId !== req.team.user_id) {
    return res.status(403).json({erreur: "acces interdit. Tu t'es trompé de route, l'ami"});
}
next();
}