const axios=require('axios')

/*TODO:BUBY
*ugl sta se događa -> axios.get('http://localhost:9080/api/recipes') javlja neki error, bez ovog axios.get app je radila bar do tog djela tutoriala
* Chrome mi nejavlja nista ,a Brave : Failed to load resource: the server responded with a status of 404 (Not Found)
*/
exports.homeRouters = (req,res)=>{
    //make a get request to /api/recipes
    axios.get('http://localhost:9080/api/recipes')
        .then(function(response){
            console.log(response)
            res.render('index',{recipes: response.data});
        })
        .catch(err=>{
            console.log(err)
            res.send(err);
        })
}

exports.addRecipe = (req,res)=>{
    res.render('addRecipe')
}

exports.updateRecipe = (req,res)=>{
    axios.get('http://localhost:9080/api/recipes', {params:{id:req.query.id}})
        .then(function(recipedata){
            res.render("updateRecipe", {user:recipedata.data})
        })
        .catch(err=>{
            console.log(err)
            res.send(err);
        })
    res.render('updateRecipe')
}