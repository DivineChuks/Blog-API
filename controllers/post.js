import Post from "../models/Post.js"

export const createPost = async (req, res) => {
    try {
        const post = await Post.create(req.body)
        res.status(400).json(post)
    } catch (error) {
        res.status(500).json(err)
    }
}


export const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(req.body.username === post.username){
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
                res.status(200).json(updatedPost)
            } catch (error) {
                res.status(500).json(error)
            }
        }else {
            res.status(400).send('You can only update your post')
        }
    } catch (error) {
        
    }
}

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(req.body.username === post.username){
            try {
                await Post.delete()
                res.status(200).json('Your post has been deleted')
            } catch (err) {
                res.status(500).json(err)
            }
        }else {
            res.status(400).send("You can only delete your post")
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const getPosts = async (req, res) => {
    const username = req.query.user
    const catName = req.query.cat
    try {
        let posts
        if (username){
            posts = await Post.find({username})
        } else if(catName){
            posts = await Post.find({categories: {
                $in: catName
            }})
        } else {
            posts = await Post.find()
        }
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json("Server error")
    }
}