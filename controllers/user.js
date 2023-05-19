import Post from "../models/Post.js"
import User from "../models/User.js"
import bcrypt from "bcryptjs"


// update user

export const updateUser = async (req, res) => {
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.compare(req.body.password, salt)
        }
        try {
           const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})

           res.status(200).json(updatedUser)
        } catch (error) {
            res.status(500).send('server error')
        }
    } else {
        res.status(400).send('You can update only your account')
    }
}

// Delete user

export const deleteUser = async (req, res) => {
    if (req.body.userId === req.params.id){
        try {
            const user = await User.findById(req.params.id)
            try {
                await Post.deleteMany({username: user.username})
                await User.findByIdAndDelete(req.params.id)
                res.status(200).send('User has been deleted')
            } catch (error) {
                res.status(500).json(err)
            }
        } catch (error) {
            res.status(500).send('Server error')
        }
    }else {
        res.status(400).send("You can only delete your account")
    }
}


// Get Users

export const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
      res.status(500).send('Server error')  
    }
}

// Get User

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const {password, ...others} = user._doc
        res.status(200).json(others)
    } catch (error) {
        res.status(500).send('Server error')  
    }
}