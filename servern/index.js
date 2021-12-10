const fastify = require("fastify")({ logger: true });
const mongoose=require('mongoose')
const PORT = 5000;
fastify.register(require('fastify-swagger'),{
    exposeRoute:true,
    routePrefix:'/docs',
    swagger:{
        info:{title:'fastify-api'}
    }
})
fastify.register(require('./routes'))

// connect to mongoose
try{
  mongoose.connect("mongodb+srv://blogapp:blogapp@cluster0.xgtqi.mongodb.net/blogapp")
  console.log("db connected")
}catch(e){
  console.log(e);
}

const startServer = async () => {
  try {
    await fastify.listen(PORT);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

startServer();
