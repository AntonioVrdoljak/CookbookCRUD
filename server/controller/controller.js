const { request } = require('express')
var Recipedb = require('../model/model')

//create and save new recipe
exports.create=(req,res)=>{
    //validate request
    if(!req.body)
    {
        res.status(400).send({message:"Content can not be empty!"});
        return;
    }

    //new recipe-create instance of the model
    const recipe=new Recipedb({
        name:req.body.name,
        ingredients:req.body.ingredients,
        description:req.body.description
    })

    //save recipe in the database - save new model into db
    recipe
        .save(recipe)
        .then(data=>{
            //res.send(data)
            res.redirect('/addRecipe')
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message || "Error occured while creating a create operation"
            })
        })
}

//retrieve and return all recipes/ retrive and return a single recipe
exports.find=(req,res)=>{

    //findOne else findMany
    if(req.query.id){
        const id=req.query.id;

        Recipedb.findById(id)
            .then(data=>{
                if(!data){
                    res.status(404).send({message:"Not found recipe with id" + id})
                }else{
                    res.send(data)
                }
            })
            .catch(err=>{
                res.status(500).send({message:"Err retriving recipe with id" + id})
            })
    }else{
        Recipedb.find()
        .then(recipe=>{
            res.send(recipe)
        })
        .catch(err=>{
            res.status(500).send({message:err.message || "Error occurred while retriving recipe information!"})
        })
    }


}

//update a new idetified recipe by recipe id
exports.update = (req, res) => {
	if (!req.body) {
		return res.status(400).send({
			error: "Data can not be empty!"
		});
	}

	const id = req.params.id;
	Recipedb.findByIdAndUpdate(id, req.body, {
			useFindAndModify: false
		})
		.then(data => {
			if (!data) {
				res.status(404).send({
					error: `Cannot update recipe with ${id} . Maybe recipe not found!`
				});
			} else res.send({data})
		})
		.catch(err => {
			res.status(500).send({
				error: "Error while updating recipe with id " + id
			});
		});
};

//delete recipe with specified recipe id in the request
exports.delete=(req,res)=>{
    const id=req.params.id;

    Recipedb.findByIdAndDelete(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message: `Cannot delete recipe with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message:"Recipe was deleted successfully!"
                })
            }
        })
        .catch(err=>{
            res.status(500).send({
                message:"Could not delete recipe with id=" + id
            });
        });
}

exports.getAllRecipes = (req, res) => {
	let aggregateOptions = [];
    
	//PAGINATION
	let page = parseInt(req.query.page) || 1;
	let limit = parseInt(req.query.limit) || 5;
	//set the options for pagination
	const customLabels = {
		totalDocs: 'totalRecipes',
		docs: 'recipes',
	};

	const options = {
		page,
		limit,
		customLabels
	};

	// Filtering
	let match = {};

	// Filter by recipe name
	if (req.query.name) match.name = {
		$regex: req.query.name,
		$options: 'i'
	};

	// Filter by ingredient
	if (req.query.ingredient) match.ingredients = {
		$regex: req.query.ingredient,
		$options: 'i'
	};

	aggregateOptions.push({
		$match: match
	});

	// Set up the aggregationvar
	myAggregate = Recipe.aggregate(aggregateOptions);
	Recipe
		.aggregatePaginate(myAggregate, options)
		.then(data => {
			if (!data)
				res.status(404).send({
					error: "Recipes not found"
				});
			else res.send({
				success: data
			});
		})
		.catch(err => {
			res.status(500).send({
				error: "Error while retrieving recipes"
			});
		});

};
