const mongoose=require('mongoose')

var schema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    ingredients:{
        type:Array,
        required:true
    },
    description: String
    
})

const RecipeDB=mongoose.model('recipedb', schema);

module.exports=RecipeDB