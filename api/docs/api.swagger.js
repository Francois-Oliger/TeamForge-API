/**
 * ============================================================
 * Documentation Swagger de TeamForge API
 * ============================================================
 *
 * Ce fichier centralise toute la documentation OpenAPI.
 * Les routes sont documentées ici afin de ne pas polluer
 * les routeurs et les contrôleurs.
 */

/**
 * @swagger
 * tags:
 *   - name: Teams
 *     description: Gestion des équipes Pokémon
 *   - name: Auth
 *     description: Authentification des utilisateurs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Team:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Team Rocket
 *         description:
 *           type: string
 *           nullable: true
 *           example: Equipe spécialisée dans la capture de Pokémon.
 *         user_id:
 *           type: integer
 *           example: 3
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *
 *     TeamRequest:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: Team Rocket
 *         description:
 *           type: string
 *           example: Equipe spécialisée dans la capture de Pokémon.
 *
 *     UserPublic:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         email:
 *           type: string
 *           example: user@example.com
 *         pseudo:
 *           type: string
 *           example: pikachu75
 *         name:
 *           type: string
 *           nullable: true
 *           example: Sacha
 *
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - email
 *         - pseudo
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: user@example.com
 *         pseudo:
 *           type: string
 *           example: pikachu75
 *         password:
 *           type: string
 *           example: Password123!
 *         name:
 *           type: string
 *           example: Sacha
 *
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: user@example.com
 *         password:
 *           type: string
 *           example: Password123!
 *
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         user:
 *           $ref: '#/components/schemas/UserPublic'
 *
 *     MessageResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: POKEMON_ADDED_TO_TEAM
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: INVALID_CREDENTIALS
 */

/**
 * @swagger
 * /teams:
 *   get:
 *     summary: Récupérer toutes les équipes
 *     description: Retourne la liste complète des équipes enregistrées.
 *     tags:
 *       - Teams
 *     responses:
 *       200:
 *         description: Liste des équipes récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Team'
 *
 *   post:
 *     summary: Créer une équipe
 *     description: Crée une nouvelle équipe pour l'utilisateur authentifié.
 *     tags:
 *       - Teams
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeamRequest'
 *     responses:
 *       201:
 *         description: Équipe créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Token manquant ou invalide
 */

/**
 * @swagger
 * /teams/{id}:
 *   get:
 *     summary: Récupérer une équipe
 *     description: Retourne une équipe avec ses Pokémon associés.
 *     tags:
 *       - Teams
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant de l'équipe.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Équipe récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       404:
 *         description: Équipe introuvable
 *
 *   put:
 *     summary: Modifier une équipe
 *     description: Modifie une équipe appartenant à l'utilisateur authentifié.
 *     tags:
 *       - Teams
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant de l'équipe à modifier.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeamRequest'
 *     responses:
 *       200:
 *         description: Équipe modifiée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Token manquant ou invalide
 *       403:
 *         description: Accès refusé
 *       404:
 *         description: Équipe introuvable
 *
 *   delete:
 *     summary: Supprimer une équipe
 *     description: Supprime une équipe appartenant à l'utilisateur authentifié.
 *     tags:
 *       - Teams
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant de l'équipe à supprimer.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Équipe supprimée avec succès
 *       401:
 *         description: Token manquant ou invalide
 *       403:
 *         description: Accès refusé
 *       404:
 *         description: Équipe introuvable
 */

/**
 * @swagger
 * /teams/{teamId}/pokemon/{pokemonId}:
 *   post:
 *     summary: Ajouter un Pokémon à une équipe
 *     description: Ajoute un Pokémon à une équipe appartenant à l'utilisateur authentifié.
 *     tags:
 *       - Teams
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         description: Identifiant de l'équipe.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: pokemonId
 *         required: true
 *         description: Identifiant du Pokémon.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pokémon ajouté à l'équipe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       401:
 *         description: Token manquant ou invalide
 *       403:
 *         description: Accès refusé
 *       404:
 *         description: Équipe ou Pokémon introuvable
 *
 *   delete:
 *     summary: Retirer un Pokémon d'une équipe
 *     description: Retire un Pokémon d'une équipe appartenant à l'utilisateur authentifié.
 *     tags:
 *       - Teams
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         description: Identifiant de l'équipe.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: pokemonId
 *         required: true
 *         description: Identifiant du Pokémon.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pokémon retiré de l'équipe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       401:
 *         description: Token manquant ou invalide
 *       403:
 *         description: Accès refusé
 *       404:
 *         description: Équipe ou Pokémon introuvable
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Inscrire un utilisateur
 *     description: Crée un nouvel utilisateur.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/UserPublic'
 *       400:
 *         description: Champs obligatoires manquants
 *       409:
 *         description: Utilisateur déjà existant
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Connecter un utilisateur
 *     description: Authentifie un utilisateur et retourne un token JWT.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Champs obligatoires manquants
 *       401:
 *         description: Identifiants invalides
 */