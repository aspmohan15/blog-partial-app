// const {
//   getuser,
//   getusers,
//   addUser,
//   updateuser,
// } = require("../controllers/users");

const { ObjectId } = require("bson");

// user schema
const User = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    email: { type: "string" },
    password: { type: "string" },
  },
};
// Options for get all users
const getUsersOpts = {
  schema: {
    response: {
      200: {
        type: "array",
        items: User,
      },
    },
  },
  //   handler: getusers,
};

const getUserOpts = {
  schema: {
    response: {
      200: User,
    },
  },
  // handler: getuser,
};

const postUserOpts = {
  schema: {
    body: {
      type: "object",
      required: ["name", "email", "password"],
      properties: {
        name: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
      },
    },
    response: {
      201: User,
    },
  },
  //handler: addUser,
};

const updateUserOpts = {
  schema: {
    response: {
      200: User,
    },
  },
  // handler: updateuser,
};
async function routes(fastify, options) {
  //   fastify.get("/users", getUsersOpts);

  //   fastify.get("/users/:id", gerUserOpts);

  //   fastify.post("/users", postUserOpts);

  //   fastify.put("/items/:id", updateUserOpts);

  const collection = fastify.mongo.db.collection("users");

  fastify.get(
    "/",
    (getUsersOpts.handler = async (req, reply) => {
      const result = await collection.find({}).toArray();
      if (!result) {
        throw new Error("No users found");
      }
      reply.send(result);
    })
  );

  fastify.post(
    "/users/login",
    (getUserOpts.handler = async (req, reply) => {
      console.log(req.body.email);
      const email = req.body.email;
      const result = await collection.findOne({ email: email });
      if (!result) {
        console.log("No user found");
        reply.send({ message: "User not found" });
      } else {
        console.log("User found");
        console.log(result.password);
        if (result.password === req.body.password) {
          reply.code(200).send(result);
        } else {
          reply.send({ message: "Invalid password" });
        }
      }
    })
  );

  //get user
  fastify.get(
    "/users/:id",
    (getUserOpts.handler = async (req, reply) => {
      const id = req.params.id;
      const result = await collection.findOne({ _id: ObjectId(id) });
      if (!result) {
        throw new Error("Invalid user");
      }
      reply.code(200).send(result);
    })
  );
  //add user
  fastify.post(
    "/user/signup",
    (postUserOpts.handler = async (req, reply) => {
      const { name, email, password } = req.body;
      const user = await collection.findOne({ email: req.body.email });

      if (user) {
        reply.send("User already exists");
      } else {
        const result = await collection.insertOne({ name, email, password });
        if (!result) {
          reply.send("error in inserting user");
        }
        reply.code(201).send(result);
      }
    })
  );
  //update user
  fastify.put(
    "/users/:id",
    (updateUserOpts.handler = async (req, reply) => {
      const { name, email, password } = req.body;
      const result = await collection.updateOne(
        { _id: ObjectId(req.params.id) },
        { $set: { name: name, email: email, password: password } }
      );
      if (!result) {
        throw new Error("Invalid user");
      }
      reply.code(200).send(result);
    })
  );
}

//   fastify.get("/animals", async (request, reply) => {
//     const result = await collection.find().toArray();
//     if (result.length === 0) {
//       throw new Error("No documents found");
//     }
//     return result;
//   });

//   fastify.get("/animals/:animal", async (request, reply) => {
//     const result = await collection.findOne({ animal: request.params.animal });
//     if (!result) {
//       throw new Error("Invalid value");
//     }
//     return result;
//   });

//   const animalBodyJsonSchema = {
//     type: "object",
//     required: ["animal"],
//     properties: {
//       animal: { type: "string" },
//     },
//   };

//   const schema = {
//     body: animalBodyJsonSchema,
//   };

//   fastify.post("/animals", { schema }, async (request, reply) => {
//     // we can use the `request.body` object to get the data sent by the client
//     const result = await collection.insertOne({ animal: request.body.animal });
//     return result;
//   });

module.exports = routes;
