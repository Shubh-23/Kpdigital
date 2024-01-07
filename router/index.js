const express = require('express')
const route = express.Router()
const UserController = require('../controller/user.controller')
const SalesController = require('../controller/sales.controller')


// {"name": ,"email":"phone":"role_id":"password": }
route.post('/user/AddUserDetails',UserController.AddUserDetails)      //done

// {  userId:"" }
route.get('/getAllCategories',UserController.getUserDetails)   //done


route.get('/user/getAllDetailsByUserId/:userId',UserController.getAllDetailsByUserId)   //done


//sale routes

//{   "user_id":params.userId,"Amount":params.Amount,"Date":params.Date}
route.post('/sales/InserSalesDetailsByUserId',SalesController.InserSalesDetailsByUserId)   //done


// {   "Date":"2023/01/16"}
route.post('/sales/getDataByDuration',SalesController.getDataByDuration)   //done


// {dateCount:1,dateType:'M'} // for the 1 month
// {dateCount:6,dateType:'M'} // for the 6 month
// {dateCount:1,dateType:'y'} // for the 1 year
route.post('/sales/getLastSevenDays',SalesController.getLastSevenDays)   //
module.exports = route