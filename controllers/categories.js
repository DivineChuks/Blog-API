import Category from "../models/Category.js"

export const createCat = async (req, res) => {
  try {
    const category = await Category.create(req.body)
    res.status(200).json(category)
  } catch (error) {
    res.status(500).json("server error")
  }
} 


export const getCat = async (req, res) => {
    try {
        const categories = await Category.find()
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json("server error")
    }
} 