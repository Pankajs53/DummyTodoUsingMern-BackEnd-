const Todo = require("../models/todo");
const User = require("../models/User");


// // create todo
exports.createTodo = async (req,res) => {
    try{
        const {name,description,importance} = req.body;
        // save this data into the todo and then update todo array in user model
        const newTodo = await Todo.create({name,description,importance});
        console.log("Todo created-> ", newTodo);
        // now update the todo array 
        try {
            const updatedUser = await User.findOneAndUpdate(
                { email: req.user.email }, // Assuming you have the user information in req.user.email
                { $push: { todo: newTodo._id } }, // Use $push to add the newTodo._id to the todo array
                { new: true } // To return the updated user document
            );
                
            updatedUser.password=undefined;
            console.log("User updated with new todo ID:", updatedUser);
            return res.status(200).json({ message: 'Todo added to user successfully', updatedUser });
        } catch (error) {
            console.error("Error updating user:", error);
            return res.status(500).json({ error: 'Internal server error' });
        }

    }catch(error){
        console.log("Error occured in Creating Todo");
        console.log("Error is->",error.message);
        res.status(505).json({
            success:false,
            message:"Error occured in creating todo"
        })
    }
}

// delete todo
exports.deleteTodo = async(req,res)=>{
    try{
        // first delete todo from Todo DB and then update the user todo array
        const {email,id} = req.user;
        const {_id} = req.body;
        console.log("emil is->",email); console.log("_id is->",_id);
        const result = await Todo.deleteOne({_id:req._id});
        if(!result){
            return res.status(506).json({
                success:false,
                message:"Unable to find the todo with _id"
            })
        }else{
            // update the User todo array
            try{
                const updatedUser = await User.findOneAndUpdate(
                    { email: req.user.email, 'todo': req.body._id },
                    { $pull: { todo: req.body._id } },
                    { new: true }
                );

                console.log("updated User->",updatedUser);

                return res.status(201).json({
                    success:true,
                    message:"DELETE TODO SUCCESFULLTY",
                    updatedUser:updatedUser
                })
            }catch(error){
                console.log("ERROR IN UPDATING THE DELETE TODO FROM USER")
                return res.status(503).json({
                    success:false,
                    message:error.message,
                })
            }
        }
    }
    catch(error){
        console.log("ERROR IN DELETEING TODO");
        console.log(error.message);
        return res.status(505).json({
            success:false,
            messsage:"ERROR IN DELETING TODO"
        })
    }
}