const express = require("express");
const verifyToken = require("../middleware/verify-token.js")
const  Recipe = require("../models/recipe.js")

const router = express.Router();


// Create Recipe
router.post("/",verifyToken, async(req,res)=>{
    try {
        req.body.author = req.user._id;
        const recipe = await Recipe.create(req.body);
        recipe._doc.author = req.user;
        res.status(201).json(recipe);
    }catch (err){
        res.status(500).json({err: err.message})
    }
})

// Get recipes
router.get("/",verifyToken, async(req,res)=>{
    try{
        const recipes = await Recipe.find({})
            .populate("author")
            .sort({ createdAt: "desc" })
            res.status(200).json(recipes)
    }catch(err){
        res.status(500).json({err: err.message})
    }
})

// Get specific recipe
router.get("/:recipeId",verifyToken, async(req,res)=>{
    try{
        const recipe = await Recipe.findById(req.params.recipeId).populate("author");
        res.status(200).json(recipe);
    }catch (err){
        res.status(500).json({err: err.message})
    }
})

// Update specific recipe
router.put("/:recipeId",verifyToken, async (req,res)=>{
    try{
        const recipe = await Recipe.findById(req.params.recipeId);

        if(!recipe.author.equals(req.user._id)){
            return res.status(403).send("You're not allowed to update this recipe")
        }

        const updateRecipe = await Recipe.findByIdAndUpdate(req.params.recipeId, req.body,{new:true})
        updateRecipe._doc.author = req.user;

        res.status(200).json(updateRecipe)

    }catch (err){
        return res.status(500).json({err: err.message})
    }
})

// Delete specific recipe
router.delete("/:recipeId",verifyToken, async (req,res) => {
    try{
        const recipe = await Recipe.findById(req.params.recipeId)
        if(!recipe.author.equals(req.user._id)){
            return res.status(403).send("You're not alloewd to delete this recipe")
        }
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.recipeId);
        res.status(200).json(deletedRecipe)
    }catch (err){
        res.status(500).json({err: err.message});
    }
});

module.exports = router