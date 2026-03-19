import { Team } from "../models/index.js";

// Loads a team by id and attaches it to the request.
export async function findTeam(req, res, next) {
  const id = req.params.id || req.params.teamId;

  // Validates id format.
  if (isNaN(id)) {
    return res.status(400).json({ error: "INVALID_ID" });
  }

  const team = await Team.findByPk(id);

  if (!team) {
    return res.status(404).json({ error: "TEAM_NOT_FOUND" });
  }

  req.team = team;
  next();
}

// Validates required fields for team creation.
export function validateCreateTeam(req, res, next) {
  const { name } = req.body || {};

  if (!name?.trim()) {
    return res.status(400).json({ error: "MISSING_REQUIRED_FIELDS" });
  }

  next();
}

// Validates fields for team update.
export function validateUpdateTeam(req, res, next) {
  const { name } = req.body || {};

  // At least one field must be provided.
  if (!name) {
    return res.status(400).json({ error: "MISSING_REQUIRED_FIELDS" });
  }

  // If name is provided, it must not be empty.
  if (name && name.trim() === "") {
    return res.status(400).json({ error: "INVALID_NAME" });
  }

  next();
}

// Ensures the authenticated user owns the team.
export function checkTeamOwner(req, res, next) {
  if (req.user.userId !== req.team.user_id) {
    return res.status(403).json({ error: "FORBIDDEN" });
  }

  next();
}