const mongoose = require('mongoose')

const followSchema = new mongoose.Schema({
        follower:{
            type: mongoose.Schema.Types.ObjectId, ref: 'User',
            required: true
        },

        following:{
            type: mongoose.Schema.Types.ObjectId, ref: 'User',
            required: true
        }
        
    },
    { timestamps: true }
);

followSchema.index({follower: 1, following:1 }, {unique:true})

followSchema.pre("validate", function (next){
    if(this.follower?.toString()=== this.following?.toString()){
        return next(new Error("Users cannot follow themselves"))
    }
    next();
})

module.exports = mongoose.model('Follow', followSchema)