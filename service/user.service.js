const user = require('../model/user.model')
const sales = require('../model/sales.model')
const bcrypt = require('bcrypt');
const saltRounds = 10;


class Users {

    async hashPassword(password) {
        return new Promise((resolve, reject) => {
          bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
              reject(err);
            } else {
              resolve(hash);
            }
          });
        });
      }

    // async AddUserDetails(params) {

    //  let datas = await bcrypt.hash(params.password, saltRounds, (err, hash) => {
    //     if (err) {
    //       console.error('Error hashing password:', err);
    //     } else {
    //       // Store the hashed password in the user object or save it to the database
    //       params.password = hash;
    //       console.log(params);
    //   return params
    //       // Now, you can save the user object (with hashed password) to your database
    //       console.log('User object with hashed password:', params);
    //     }
    // })
    //  console.log("params",params);
    //     const data = {
    //         "id":params.id,
    //         "name": params.name,
    //         "email": params.email,
    //         "phone": params.phone,
    //         "role_id": params.role_id,
    //         "password": params.password,
    //         "remember_token": params.remember_token
    //     }
    //     console.log(data);
    //     const UserData = new sales(data)
    //     return UserData.save(null).tap(res => {
    //         return res
    //     }).catch((err) => {
    //         return err
    //     })
    // }

    async AddUserDetails(params) {
        try {
          // Hash the password using async/await
          const hashedPassword = await this.hashPassword(params.password);
      
          // Update the params object with the hashed password
          params.password = hashedPassword;
      
          console.log("params", params);
      
          const data = {
            "id": params.id,
            "name": params.name,
            "email": params.email,
            "phone": params.phone,
            "role_id": params.role_id,
            "password": params.password,
            "remember_token": params.remember_token
          };
          const UserData = new sales(data);
      
          // Save the user data to the database using async/await
          const savedUserData = await UserData.save();
      
          console.log('User object with hashed password:', savedUserData);
      
          return savedUserData;
        } catch (error) {
          console.error('Error:', error);
          throw error; // Rethrow the error or handle it accordingly
        }
      }
      

   IncreaptPassword(params){
    bcrypt.hash(params.password, saltRounds, (err, hash) => {
        if (err) {
          console.error('Error hashing password:', err);
        } else {
          // Store the hashed password in the user object or save it to the database
          params.hashedPassword = hash;
          console.log(params);
      return params
          // Now, you can save the user object (with hashed password) to your database
          console.log('User object with hashed password:', params);
        }
    })
}


    getUserDetails(params) {
        return user.forge().query((qb) => {
            // qb.where({ "id": params.userId })
        }).fetchAll().then((data) => {
            console.log(data);
            return data

        }).catch((err) => {
            return err
        })
    }

    getAllDetailsByUserId(params) {
        console.log(params);
        return user.where({ Id: params.userId }).fetchAll({ withRelated: ['sales'] }).then((data) => {
            return data
        }).catch((err) => {
            return err
        })
    }

}

module.exports = new Users