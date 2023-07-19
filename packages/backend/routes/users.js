const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const passport = require('passport')
const { nanoid } = require('nanoid');
require('dotenv').config()

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

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
        req.user = user;
        next();
    })(req, res, next)
}
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
};
router.get("/all-users", getAllUsers);

router.post('/users/signup', async (req, res, next) => {
    const { email, password, name } = req.body
    const user = await User.findOne({ email })
    if (user) {
      return res.json({
        status: "error",
        code: 409,
        data: "Conflict",
        message: "Email in use",
      })
    }
    try {
      const newUser = new User({ email })

      newUser.name = name;
  
      newUser.setPassword(password);

      newUser.verificationToken = nanoid()

      await newUser.save();

      const msg = {
        to: email,
        from: 'walletavengersapp@gmail.com',
        subject: 'Please verify your email and registration.',
        text: `URL to mail verification: /users/verify/:verificationToken, and your verificationToken is ${newUser.verificationToken}`
      }
  
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent');
        })
        .catch(error => {
          console.error(error);
        })
  
      res.json({
        status: "success",
        code: 201,
        data: "Created",
        message: "Register complete! Check your email to confirm verification.",
      })
    } catch (error) {
      next(error);
    }
  })

  router.post('/users/login', async (req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    const loginVerify = user.verify
  
    if(!user || !user.validPassword(password)) {
      return res.json({
        status: "error",
        code: 400,
        data: "Bad request",
        message: "Incorrect login or password"
      })
    }

    if(loginVerify === false){
      return res.json({
        status: "error",
        code: 404,
        data: "Not found",
        message: "Incorrect login or password. Check if your login is verified."
      })
    }
  
    const payload = {
      id: user.id,
    }
  
    const secret = process.env.SECRET
  
    const token = jwt.sign(payload, secret, { expiresIn: '1h' })

    user.token = token;

    await user.save()
  
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
  
    user.token = null;
    await user.save()
      
    return res.json({
      status: "success",
      code: 204,
      message: "Logout successful"
    })
  })

  router.get('/users/current', auth, async (req, res, next) => {
    const email = req.user.email;
    const name = req.user.name;
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
        name,
      },
      message: `Current user is ${email}`
    })
  })
  
  router.get('/api/users/verify/:verificationToken', async (req, res, next) => {
    const user = await User.findOne({ verificationToken: req.params.verificationToken });

    if(!user) {
      return res.json({
        status: 'error',
        code: 404,
        message: 'User not found',
        data: 'Not found',
      })
    }

    try {   
      res.json({
        status: 'success',
        code: 200,
        message: 'Verification successful',
        data: 'OK',
      })
    } catch(error) {
      next(error)
    }
  
    if(user) {
      user.verify = true;
      user.verificationToken = "null";
  
      await user.save();
    }
  })

  router.post('/users/verify', async (req, res, next) => {
    const {email} = req.body
    const user = await User.findOne({ email })
  
    if(!email) {
      return res.json({
        status: "error",
        code: 400,
        message: "Missing required field email"
      })
    }
  
    if(email && user.verify === true) {
      return res.json({
        status: "error",
        code: 400,
        message: "Verification has already passed"
      })
    }
  
    if(email && user.verify === false) {
      const msg = {
        to: email,
        from: 'walletavengersapp@gmail.com',
        subject: 'Please verify your email and registration.',
        text: `URL to mail verification: /api/users/verify/:verificationToken, and your verificationToken is ${user.verificationToken}`
      }
  
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent');
        })
        .catch(error => {
          console.error(error);
        })
      
      return res.json({
        status: "success",
        code: 200,
        message: "Verification email sent"
      })
    }
  })

  module.exports = router