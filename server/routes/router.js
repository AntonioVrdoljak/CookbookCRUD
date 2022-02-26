const express = require('express')
const route = express.Router()

const services = require('../services/render')
const controller=require('../controller/controller')
/*
*@description Root Route
*@method GET/
*/
route.get('/', services.homeRouters)

/*
*@description Add Recipe
*@method GET/addRecipe
*/
route.get('/addRecipe', services.addRecipe)

/*
* @description Update Recipe
* @method GET/updateRecipe
*/
route.get('/updateRecipe', services.updateRecipe)

//API
route.post('/api/recipes', controller.create)
route.get('/api/recipes', controller.find)
route.put('/api/recipes/:id', controller.update)
route.delete('/api/recipes/:id', controller.delete)

module.exports=route