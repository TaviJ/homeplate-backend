const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
    {
        text:{
            type: String,
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,ref: 'User',
            required: true
        }
    },
    {timestamps: true}
)

const ingredientSchema = new mongoose.Schema(
    {
        nameIngredient: {
            type: String,
            required: true,
        },
        unitQuantity:{
            type: Number,
            required: true
        },
        
    },
    { _id: false }
)

const stepSchema = new mongoose.Schema(
    {
        stepNumber:{
            type:Number,
            required: true
        },

        stepTitle:{
            type: String,
            required:true
        },

        stepDescription:{
            type: String,
            required:true
        }
    },
    { _id: false }
)

const recipeSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },

    description:{
        type: String,
        required: true,       
    },

    imageUrl:{
        type: String,
        required: true,
    },

    prepTime:{
        type: Number,
        required: true,
    }, 

    difficultyLevel:{
        type: String,
        required: true,
        enum:['Easy', 'Medium','Hard']
    },

    ingredients:{
        type: [ingredientSchema],
        required: true
    },

    tags:{
        type: [String],
        required: true
    },
    
    steps:{
        type: [stepSchema],
        required: true
    },

    author:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    comments:{
        type: [commentSchema],
        default: [] 
    },

    likes:{
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        default: [],
    },

    typeRecipe:{
        type: String,
        required:true,
        enum:['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack']
    },

    servings:{
        type: Number,
        required: true,
        min: 1,
    }
},
    { timestamps: true }
)

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;