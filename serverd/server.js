const fastify = require("fastify")({ logger: true });
fastify.register(require("fastify-formbody"));
fastify.register(require("fastify-multipart"));
fastify.register(require("./model/db"));
fastify.register(require("./routes/users"));
fastify.register(require("fastify-cors"), {
  origin: "*",
});
fastify.register(require("fastify-swagger"), {
  exposeRoute: true,
  routePrefix: "/docs",
  swagger: {
    info: { title: "fastify-api" },
  },
});

const PORT = 4000;

const start = async () => {
  try {
    await fastify.listen(PORT);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
