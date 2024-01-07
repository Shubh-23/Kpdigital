const salesService = require('../service/sales.service')

class Products{
    InserSalesDetailsByUserId(req,res){
        const params = req.body
        return salesService.InserSalesDetailsByUserId(params).then((data)=>{
            if(data){
                return res.json({"statusCode":200,"SalesDetails":data,"message":"successfully"})
            }else{
                return res.json({"statusCode":500,"SalesDetails":{},"message":"something went wrong"})
            }
        })
    }
    getDataByDuration(req,res){
        const params = req.body
        return salesService.getDataByDuration(params).then(data=>{
            if(data){
                return res.json({"errorCode":"200","SalesbyDateDuration":data,"message":"successfully"})
            }
            else{
                return res.json({"errorCode":"500","SalesbyDateDuration":{},"message":"something went wrong"})
            }
        })
    }

    getLastSevenDays(req,res){
        const params = req.body
        return salesService.getLastSevenDays(params).then(data=>{
            if(data){
                return res.json({"errorCode":"200","SalesbyDateDuration":data,"message":"successfully"})
            }
            else{
                return res.json({"errorCode":"500","SalesbyDateDuration":{},"message":"something went wrong"})
            }
        })
    }
}

                

module.exports = new Products