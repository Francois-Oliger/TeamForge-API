import { Team, Pokemon } from "../models/index.js";



 //---------------Recuperer toutes les listes:-----------------
export async function getAllTeams(req, res) {
const teams = await Team.findAll({order: [['id', 'DESC']]});
 res.json(teams);
}


//----------------Recupérer une team:-----------------------
export async function getOneTeam (req, res) {
    const id = req.params.id;
    const team = await Team.findByPk(id, {
        include: [Pokemon]
      });   
    res.json(team);
}


//-----------------Créer une team:--------------------------
export async function createTeam(req, res) {
    //req.user.userId vient du middleware d'authentification, donc ici je récupere l'id de l'user connecté
    const userId = req.user.userId;
    // ici on demande à sequelize de créer une ligne dans la DB.  
    const team = await Team.create({
        //ici on recupère toutes les données envoyées dans la requête (grace à l'opérateur spread),
        //et on ajoute userId qui est absent de la requête (et si il y est ca l'écrase; donc sécurité sup).
        //de cette manière on lie la création de la team à un user en particulier.
        ...req.body,
    user_id: userId,
  });

  res.status(201).json(team);
}



//----------------Supprimer une team:-------------------------
export async function deleteTeam (req,res) {
    const team = req.team;    
    await team.destroy();    
    res.json({message: "team supprimée avec succès"});
}



//--------------Mettre à jour une team-------------------------
export async function updateTeam (req,res) {
    const team = req.team;    
    await team.update(req.body);
    res.json(team);
}



//-------------Ajouter un pokemon à une team-----------------
export async function addPokemonToTeam (req, res) {
    //on récupère l’objet team déjà trouvé par le middleware
    const team = req.team;
    //pareil ici
    const pokemon = req.pokemon;
    //team.addPokemon est une methode créé automatiquement par sequelize grâce au belongsToMany (donc sequelize va créer une ligne dans team_pokemon)
    await team.addPokemon(pokemon);
    res.json({message: "Ce pokemon fait désormais partie de votre team"});
}



//---------pour retirer un pokemon d'une team----------------
export async function removePokemonFromTeam(req, res) {
    const team = req.team;
    const pokemon = req.pokemon;
// team.removePokemon aussi a été automatiquement généré par sequelize grace au bilongsToMany. (donc supprime la relation dans la table pivot team_pokemon)
    await team.removePokemon(pokemon);
    res.json({ message: "Ce pokemon a été retiré de votre team" });
}
