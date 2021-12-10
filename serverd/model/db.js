// CommonJs
const fastifyPlugin = require("fastify-plugin");

async function dbConnector(fastify, options) {
  fastify.register(require("fastify-mongodb"), {
    url: "mongodb+srv://blogapp:blogapp@cluster0.xgtqi.mongodb.net/blogapp",
  });
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(dbConnector);
