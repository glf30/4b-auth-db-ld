const User = require('../Model/usersModel')
const bcrypt = require("bcrypt")


/* 
req.body - { username: "", password: "examplePassword123"}

*/

//  POST new user with password hashing

const createUser = async (req,res) => {
    try {
//  Generate Salt
        const salt = await bcrypt.genSalt()

//  Generate our hashedPassword
        const hashedPassword = await bcrypt.hash(
            req.body.password,
            salt
        )

//  Set up new data
        const secureUserData = {
            username: req.body.username,
            password: hashedPassword
        }

        const newUser = await User.create(secureUserData)
        res.json(newUser)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//  GET all users - List all users

const listUsers = async (req,res) => {
    try {
        const userList = await User.find()
        res.json(userList)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


//  Set up a user login with a POST request 

const login = async (req,res) => {
    try {
        //  verify that users exist
        const foundUser  = await User.findOne({
            username: req.body.username
        })
        if(!foundUser){
            return res.status(404).json({ message: "Could not find user. Please sign up or try again"})
        }
        const isCorrectPassword = await bcrypt.compare(
            req.body.password,
            foundUser.password
        )

        if(!isCorrectPassword){
            return res.status(401).json({ message: "Login Failed, username or password is incorrect. Please try again"})
        } else{
            return res.status(201).json({ message: "Login Successfull" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


module.exports = {  createUser, listUsers, login }

/*

const loginCheck = async (req,res) => {

    // find a use that exists with the Model.findOne()
        //findOne takes object key and value pairs
    
    // use bcrypt.compare to ensure that request contains the correct user and user password
        // create a failed login message if request do not match data


    }

const salt = bcrypt.genSalt() // create the salt variable function
bcrypt.hash( req.body.password , salt) //Salt and hash password request
bcrypt.compare(req.body.password, foundUser.password ) //Login




*/