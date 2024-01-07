const salesTable = require('../model/sales.model')
const promise = require('bluebird')
const moment = require('moment')

class Products {
    async InserSalesDetailsByUserId(params) {
        var date = new Date(params.Date)
        const data = {
            "user_id": params.userId,
            "Amount": params.Amount,
            "Date": date,
        }
        var responseData = []
        return await salesTable.forge().query((qb) => {
            qb.where({ "Date": date })
            qb.andWhere({ "user_id": params.userId })
        }).fetchAll().then((result) => {

            if (result.length == 0) {
                const salesdata = new salesTable(data)
                return salesdata.save(null).tap(res => {
                    return res
                }).catch((err) => {
                    return err
                })

            } else {
              return  promise.all(result.models).each((res) => {
                    console.log(res.get('user_id'))
                    return salesTable.forge().query((qb) => {
                        qb.where({ "user_id": res.get('user_id') })
                        qb.andWhere({ "Date": date })
                    }).fetch().then((response) => {
                        response.save(data, { patch: true }).then((updateData) => {
                            console.log(updateData);
                            responseData.push(updateData)
                            return responseData
                        })
                        return responseData
                    })
                }).then((res)=>{
                    return res
                })

            }
        }).catch((err) => {
            return err
        })


    }

    getDataByDuration(params) {
        var dateFrom  = new Date(params.Date)
        var dateTo = new Date()
        return salesTable.forge().query((qb) => {
            qb.whereBetween( "Date", [dateFrom, dateTo] )      
        }).fetchAll().then((data) => {
            return data
        }).catch((err) => {
            return err
        })
    }


    getLastSevenDays(params) {
        var  dateTo
        var dateFrom
        console.log(params);
        if (params.length == 0) {
              dateTo = moment().format('YYYY-MM-DD');
             dateFrom = moment().subtract(7,'d').format('YYYY-MM-DD');
            }else{
            dateTo = moment().format('YYYY-MM-DD');
           dateFrom = moment().subtract(+params.dateCount,`${params.dateType}`).format('YYYY-MM-DD');
        }
            console.log(dateTo,dateFrom);
            return salesTable.forge().query((qb) => {
            qb.whereBetween( "Date", [dateFrom, dateTo] )      
        }).fetchAll().then((data) => {
            // console.log(data);
            return data
        }).catch((err) => {
            return err
        })
    }


    // getDataByDuration(params) {
    //     var dateFrom  = new Date(params.Date)
    //     var dateTo = new Date()
    //     return salesTable.forge().query((qb) => {
    //         qb.whereBetween( "Date", [dateFrom, dateTo] )      
    //     }).fetchAll().then((data) => {
    //         return data
    //     }).catch((err) => {
    //         return err
    //     })
    // }

}

module.exports = new Products