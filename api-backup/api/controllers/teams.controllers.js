import { Team, Pokemon } from "../models/index.js";



 // Recuperer toutes les listes:
export async function getAllTeams(req, res) {
const teams = await Team.findAll({order: [['id', 'DESC']]});
 res.json(teams);
}

export async function getOneTeam (req, res) {
    const id = req.params.id;
    const team = await Team.findByPk(id, {
        include: [Pokemon]
      });   
    res.json(team);
}

export async function createTeam (req,res) {
    const team = await Team.create(req.body);    
    res.status(201).json(team);
}

export async function deleteTeam (req,res) {
    const team = req.team;    
    await team.destroy();    
    res.json({message: "team supprimée avec succès"});
}

export async function updateTeam (req,res) {
    const team = req.team;    
    await team.update(req.body);
    res.json(team);
}

//Pour ajouter un pokemon à une team
export async function addPokemonToTeam (req, res) {
    //on récupère l’objet team déjà trouvé par le middleware
    const team = req.team;
    //pareil ici
    const pokemon = req.pokemon;
    //team.addPokemon est une methode créé automatiquement par sequelize grâce au belongsToMany (donc sequelize va créer une ligne dans team_pokemon)
    await team.addPokemon(pokemon);
    res.json({message: "Ce pokemon fait désormais partie de votre team"});
}

//pour retirer un pokemon d'une liste
export async function removePokemonFromTeam(req, res) {
    const team = req.team;
    const pokemon = req.pokemon;
// team.removePokemon aussi a été automatiquement généré par sequelize grace au bilongsToMany. (donc supprime la relation dans la table pivot team_pokemon)
    await team.removePokemon(pokemon);
    res.json({ message: "Ce pokemon a été retiré de votre team" });
}
