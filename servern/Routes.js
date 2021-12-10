
const {getItems,addItem,deleteItem,updateItem}=require("./controller");

function routes(fastify,options,done){

    const dataItems={
        type:'object',
        properties:{
            // id:{type:'string'},
            title:{type:'string'},
            content:{type:'string'},
            category:{type:'string'}
        },
    }
    // option for all
    const getalloptions={
        schema:{
            200:{
                type:'array',
                data:dataItems
            },
        },
        handler:getItems
    }

    // add a item
    const postItemopts={
        schema:{
            response:{
                201:dataItems
            }
        },
        handler:addItem
    }
    // delete a item
    const deleteItemopts={
        schema:{
            response:{
                200:{
                    type:'object',
                    properties:{
                        message:{type:'string'}
                    }
                }
            }
        },
        handler:deleteItem
    }

    // update a item
    const updateItemopts={
        schema:{
            response:{
                200:dataItems
            }
        },
        handler:updateItem
    }

    // get all item
    fastify.get('/api/view',getalloptions)

    // post a item
    fastify.post('/api/create',postItemopts)

    // delete a item
    fastify.delete('/api/items/:id',deleteItemopts)

    // update item
    fastify.post('/api/edit/:id',updateItemopts)

    done();
}
module.exports=routes;