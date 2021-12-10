const {v4:uuidv4}= require('uuid')
const Blog = require('./models/blogs')
// const Blog = require('./models/blogs')
const Blogs=require('./models/blogs')

const getItems=async(req,reply)=>{
    Blogs.find().then(foundBlog=>reply.send(foundBlog))
}

const addItem=async (req,reply)=>{
    const {title,content,category}=await req.body;
    const item=await new Blog({
        title,
        content,
        category
    })
    try{
        await item.save()
        await reply.code(201).send(item)
    }catch(e){
        console.log(e);
    }
   
    // try{
    //     const blog=req.body;
    //     const newBlog=await blog.create(blog);
    //     reply.code(201).send(newBlog);
    // }catch(e){
    //     reply.code(500).send(e)
    // }
}

const deleteItem=async(req,reply)=>{
    // items=Blogs.filter(blog=>blog.id.toString()!==id.toString());
    // reply.send({message:`the ${id} has been removed`})
    try{
        const {id}=req.params;
        const blogtoDelete=await Blogs.findById(id);
        await Blogs.findByIdAndDelete(id);
        reply.code(200).send({ data: blogtoDelete });
    }catch(e){
        reply.code(500).send(e);
    }
}

const updateItem=async(req,reply)=>{
    // const {id}=req.params;
    // const {name,content,category}=req.body;
    // items=items.map(item=> (item.id.toString()===id ? {id,name,content,category}:item))
    // item=items.find((item)=>item.id.toString()===id.toString())
    // reply.send("post has been updated");
    try{
        const {id}=req.params;
        const updates=req.body;
        await Blogs.findByIdAndUpdate(id,updates);
        const blogToUpdate=await Blog.findById(id);
        reply.code(200).send({ data: blogToUpdate });
    }catch(e){
        reply.code(500).send(e);
    }

}

module.exports={getItems,addItem,deleteItem,updateItem}