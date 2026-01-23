const express = require("express");
const verifyToken = require("../middleware/verify-token.js")
const  Recipe = require("../models/recipe.js");

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
            .populate("author","username")
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
        if(!recipe) return res.status(404).json({err: "Recipe not found"})

        res.status(200).json(recipe);
    }catch (err){
        res.status(500).json({err: err.message})
    }
})

// Update specific recipe
router.put("/:recipeId",verifyToken, async (req,res)=>{
    try{
        const recipe = await Recipe.findById(req.params.recipeId);
        if(!recipe) return res.status(404).json({err: "Recipe not found"})
        
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
        if(!recipe) return res.status(404).json({err:"Recipe not found"})

        if(!recipe.author.equals(req.user._id)){
            return res.status(403).send("You're not alloewd to delete this recipe")
        }
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.recipeId);
        res.status(200).json(deletedRecipe)
    }catch (err){
        res.status(500).json({err: err.message});
    }
});


// Create comment
router.post("/:recipeId/comments", verifyToken, async(req,res)=>{
    try{
        req.body.author= req.user._id;
        const recipe = await Recipe.findById(req.params.recipeId);
        if(!recipe) return res.status(404).json({err:"Recipe not found"})

        recipe.comments.push(req.body);
        await recipe.save();

        const newComment = recipe.comments[recipe.comments.length -1]
        newComment._doc.author = req.user;

        res.status(201).json(newComment)
    }catch (err){
        res.status(500).send({err: err.message})
    }
})

// Get comments for a specific recipe
router.get("/:recipeId", verifyToken, async(req, res)=>{
    try{
        const recipe = await Recipe.findById(req.params.recipeId).populate(["author","comments.author"]);
        if(!recipe) return res.status(404).json({err:"Recipe not found"});

        res.status(200).json(recipe);
    }catch(err){
        res.status(500).send({err: err.message})
    }
    
})

// Update specific comment
router.put("/:recipeId/comments/:commentId", verifyToken, async(req,res)=>{
    try{
        if (!req.body.text) return res.status(400).json({ err: "text is required" });

        const recipe = await Recipe.findById(req.params.recipeId)
        if(!recipe) return res.status(404).json({err:"Recipe not found"})

        const comment = recipe.comments.id(req.params.commentId);
        if(!comment) return res.status(404).json({err: "Comment not found"})

        if (comment.author.toString()!== req.user._id){
            return res.status(403).json({message:"You are not authorized to edit this comment"});
        }

        comment.text = req.body.text;
        await recipe.save();
        res.status(200).json(comment)
    }catch(err){
        res.status(500).send({err: err.message})
    }
})

// Delete specific comment
router.delete('/:recipeId/comments/:commentId', verifyToken, async (req,res)=>{
    try{

        const recipe = await Recipe.findById(req.params.recipeId);
        if(!recipe) return res.status(404).json({err: "Recipe not found"})
        
        const deleteComment = recipe.comments.id(req.params.commentId)
        if (!deleteComment) return res.status(404).json({err: "Comment not found"})
        
        if(deleteComment.author.toString()!==req.user._id){
            return res.status(403).json({message:"You are not authorized to delete this comment"});
        }
        
        deleteComment.deleteOne();
        await recipe.save()
        return res.status(200).json({message:"Comment deleted successfully"})
    
    }catch(err){
        return res.status(500).json({err: err.message})
    }
})

module.exports = router