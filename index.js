import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoute from './routes/auth.js'
import userRoute from './routes/users.js'
import postRoute from './routes/posts.js'
import categoryRoute from './routes/categories.js'
import multer from 'multer'

dotenv.config()

const app = express()

app.use(express.json())

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to Mongo db')
}).catch((err) => {
    console.log('error connecting to mongo db:', err)
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    }
})

const upload = multer({storage: storage})

app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).send('File has been uploaded')
})

app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/post', postRoute)
app.use('/api/category', categoryRoute)


app.listen("5000", () => {
    console.log('Backend is running')
})