const { express, request, response } = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { version } = require("../../package.json");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Devtinder API",
      version,
      description: "A simple Devtinder API",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};
const specs = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  //Swagger page
  app.use("/api-docs", swaggerUi.serve);
  app.get("/api-docs", swaggerUi.setup(specs));
  //Docs in JSON format
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(specs);
  });
  //   app.listen(port, () => {
  //     console.log(`Server is running on port ${port}`);
  //   });
}

module.exports = swaggerDocs;
