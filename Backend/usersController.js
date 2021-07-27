const User =require("../Models/userModel");
const dbconnect =require("../Config/config.db");
const jwt =require("jsonwebtoken");
const bcrypt =require("bcryptjs");
const util =require("../utils");

//////////////////////////////////////////////////////////////////////////
// getUsersList from Database. // 
exports.getUsersList = (req, res) => {
    dbconnect.query('SELECT * FROM ecommerce.users', (err, result) =>{
        if(err){
            res.status(500).json({ success: false, message: "Error Fetching Users From Database!"});
        }else{
            if(result){
             console.log("Users Fetched Successfully!");
             result(res);
            }
        }
    })
}
////////////////////////////////////////////////////////////////////////////
// getUserByID from Database. //


// createNewUser In The Database. //
exports.createNewUser = (req, res) => {
     const firstname = req.body.firstname;
     const lastname = req.body.lastname;
     const email = req.body.email;
     const password = req.body.password;
     
     if(firstname && lastname && email && password === 0){
         res.status(400).json({ success: false, message: "Please Have All Fields Completed Before Submitting!"});
     }else{
         dbconnect.query('SELECT * FROM ecommerce.users WHERE user_email = ?', [req.body.email], (e, result) => {
             if(e){
                 res.status(500).json({ success: false, message: "An Error Occuried When Creating User!."});
             }else{
                if(result.length === 1){
                   res.status(401).json({ success: false, message: "User Is Already In Use!"});
                }else{
                    if(result.length === 0){
                bcrypt.hash(req.body.password, 10, (e,hash) => {
                    if(e){
                        res.status(500).json({ success: false, message: "An Error Occuired When Creating User!."});
                    }else{
                        if(hash){
            dbconnect.query('INSERT INTO ecommerce.users (user_firstname, user_lastname, user_email, user_password) VALUES (?,?,?,?)', 
                             [req.body.firstname, req.body.lastname, req.body.email, hash], (e, result) => {
                                 if(e){
                                     res.status(500).json({ success: false, message: "An Error Occured Creating User!"});
                                 }else{
                                     if(result){
                                          return res.status(201).json({ success: true, message: "User Created Successfully"});
                                     }
                                 }
                             })
                        }
                    }
                })
                    }
                }
             }
         } )
     }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
