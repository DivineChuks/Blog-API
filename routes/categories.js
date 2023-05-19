import express from 'express'
import {createCat, getCat  } from '../controllers/categories.js'

const router = express.Router()

router.post("/", createCat)

router.get("/", getCat)

export default router