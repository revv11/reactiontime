const User = require('../models/models')
const jwt = require('jsonwebtoken')

const maxAge = 3*24*60*60;
const createToken  = (id) =>{
    return jwt.sign({id}, 'reactiontime', {
        expiresIn: maxAge
    })
}

const register_post = async(req,res)=>{
    try{
        const name = req.body.name;
        const newuser = await User.create({name})
        const token = createToken(newuser._id)
        res.json({user:newuser._id, jwt: token})
    }
    catch(err){
        if(err.errorResponse){

            if(err.errorResponse.code == 11000){
                res.json({error:"username already taken"}) 
    
            }
        }
        else{
            res.json({error:err.errors.name.properties.message})
        }
    }

    }


const update_time = async (req,res)=>{

    const id = req.body.id;
    const time = req.body.time
    try{
        const user = await User.findOne(
            {_id : id},
        )
        if(user.time>time){
            await User.findByIdAndUpdate(
                {_id:id},
                {time:time}
            )
            res.json({time:time})

        }
        else if(user.time<=time){
            res.json({time:user.time})
        }
        else{
            await User.findByIdAndUpdate(
                {_id:id},
                {time:time}
            )
            res.json({time:time})

        }
    }
    catch(err){
        res.json({error:err})
    }
}


const get_all = async(req,res)=>{
    try{
        const results = await User.find().sort({time:1})
        res.json({table:results})
    }
    catch(err){
        res.json({error:err})
    }
}

module.exports= {register_post, update_time, get_all}