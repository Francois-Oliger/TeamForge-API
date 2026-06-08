/**
 * ============================================================
 * Configuration Swagger de TeamForge-API
 * ============================================================
 *
 * Ce fichier centralise toute la configuration OpenAPI.
 * Swagger lit le fichier api.swagger.js afin de générer
 * automatiquement la documentation de l'API.
 */

import swaggerJsdoc from "swagger-jsdoc";

/**
 * Options générales utilisées pour générer la documentation Swagger.
 */
const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "TeamForge API",
      version: "1.0.0",
      description: "Documentation officielle de TeamForge API.",
    },

    /**
     * Déclaration du système d'authentification JWT.
     * Swagger affichera un bouton Authorize permettant
     * de saisir un Bearer Token.
     */
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },

  /**
   * Fichier contenant la documentation OpenAPI.
   */
  apis: ["./docs/api.swagger.js"],
};

/**
 * Génération de la spécification OpenAPI.
 */
const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;