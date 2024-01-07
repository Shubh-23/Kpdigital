const userService = require('../service/user.service')

class User{
    AddUserDetails(req,res){
        const params = req.body
        return userService.AddUserDetails(params).then((data)=>{
            if(data){
                return res.json({"statusCode":200,"submitUserDetails":data,"message":"successfully"})
            }else{
                return res.json({"statusCode":500,"submitUserDetails":{},"message":"something went wrong"})
            }
        })
    }

    getUserDetails(req,res){
        const params = req.params
        return userService.getUserDetails(params).then(data=>{
            if(data){
                return res.json({"statusCode":200,"AllCategories":data,"message":"successfully"})
            }
            else{
                return res.json({"statusCode":500,"UserDetails":{},"message":"something went wrong"})
            }
        })
    }

    getAllDetailsByUserId(req,res){
        const params = req.params
        return userService.getAllDetailsByUserId(params).then(data=>{
            if(data){
                return res.json({"statusCode":200,"UserDetails":data,"message":"successfully"})
            }
            else{
                return res.json({"statusCode":500,"UserDetails":{},"message":"something went wrong"})
            }
        })
    }
}

                

module.exports = new User