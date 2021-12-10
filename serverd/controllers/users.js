const fastify = require("fastify")({ logger: true });
const { v4: uuidv4 } = require("uuid");
fastify.register(require("../model/db"));

const getusers = async (req, reply) => {
  const collection = fastify.mongo.db.collection("users");
  const result = await collection.find({}).toArray();
  if (!result) {
    throw new Error("No users found");
  }
  reply.send(result);
};

//get user
const getuser = async (fastify, req, reply) => {
  const collection = fastify.mongo.db.collection("users");

  const { email } = req.body.email;

  const result = await collection.findOne({ email: email });
  if (!result) {
    throw new Error("Invalid user");
  }
  reply.code(200).send(result);
};

//add user
const addUser = async (fastify, req, reply) => {
  const collection = fastify.mongo.db.collection("users");

  const { name } = req.body.name;
  const { email } = req.body.email;
  const { password } = req.body.password;

  const user = {
    id: uuidv4(),
    name,
    email,
    password,
  };

  const result = await collection.insertOne(user);
  if (!result) {
    throw new Error("Error to add user");
  }
  reply.code(201).send(result);
};

//delete user
// const deleteuser = (req, reply) => {
//   const { id } = req.params;

// const result=await collection.deleteOne({id:id});
// if(!result){
//     throw new Error("Error to delete user");
// }
//   reply.send({ message: `Item ${id} has been removed` });
// };

//update user
const updateuser = async (fastify, req, reply) => {
  const collection = fastify.mongo.db.collection("users");

  const { id } = req.params;
  const { name } = req.body;
  const { email } = req.body.email;
  const { password } = req.body.password;

  const result = await collection.updateOne(
    { id: id },
    { $set: { name: name, email: email, password: password } }
  );
  if (!result) {
    throw new Error("Error to update user");
  }

  reply.code(200).send(result);
};

module.exports = {
  getuser,
  getusers,
  addUser,
  updateuser,
};
