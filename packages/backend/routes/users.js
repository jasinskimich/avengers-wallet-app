const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const passport = require('passport')
require('dotenv').config()

const User = require('../models/users')

const auth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if(!user || err) {
            return res.status(401).json({
            status: 'error',
            code: 401,
            data: 'Unauthorized',
            message: 'Not authorized',
            })
        }
        req.user = user
        next()
    })(req, res, next)
}

router.post('/users/signup', async (req, res, next) => {
    const { email, password, name } = req.body
    const user = await User.findOne({ email })
    if (user) {
      return res.json({
        status: "error",
        code: 409,
        data: "Conflict",
        message: "Email in use"
      })
    }
    try {
      const newUser = new User({ email })

      newUser.name = name
  
      newUser.setPassword(password)
  
      await newUser.save()
  
      res.json({
        status: "success",
        code: 201,
        data: "Created",
        message: "Register complete!"
      })
    } catch (error) {
      next(error)
    }
  })

  router.post('/users/login', async (req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
  
    if(!user || !user.validPassword(password)) {
      return res.json({
        status: "error",
        code: 400,
        data: "Bad request",
        message: "Incorrect login or password"
      })
    }
  
    const payload = {
      id: user.id,
    }
  
    const secret = process.env.SECRET
  
    const token = jwt.sign(payload, secret, { expiresIn: '1h' })
  
    return res.json({
      status: "success",
      code: 200,
      data: {
        token
      }
    })
  })

  router.get('/users/logout', auth, async (req, res, next) => {
    const id = req.user._id;
    const user = await User.findById(id);
  
    if(!user) {
        return res.json({
        status: "error",
        code: 401,
        data: "Unauthorized",
        message: "Not authorized"
      })
    } 
  
    token = null;
    await user.save()
      
    return res.json({
      status: "success",
      code: 204,
      message: "Logout successful"
    })
  })

  router.get('/users/current', auth, async (req, res, next) => {
    const email = req.user.email;
    const id = req.user._id;
    const user = await User.findById(id);
  
    if(!user) {
      return res.json({
        status: "error",
        code: 401,
        data: "Unauthorized",
        message: "Not authorized"
      })
    }
  
    return res.json({
      status: "success",
      code: 200,
      data: {
        email,
      },
      message: `Current user is ${email}`
    })
  })
  

  module.exports = router