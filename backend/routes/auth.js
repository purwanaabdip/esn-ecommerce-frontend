"use strict"
// Module Dependencies
const router = require("express").Router()
const codeDictionary = require("../responseCodes.json")
const appVer = require("../app.json")
const User = require("../models/user")

// Set metadata
let meta = {
	createdAt: new Date(),
	createdBy: "",
	updatedAt: new Date(),
	updatedBy: "",
	deletedAt: "",
	deletedBy: ""
}
let response = {}
response.api = appVer
// ---------------------------------
// Auth routes (/auth)
// ---------------------------------
router.post("/register", (req, res) => {
	User.register(new User({ username: req.body.username }), req.body.password, (err) => {
	  if (err) {
			response.notification = err
			response.notification.type = "error"
	    res.send(response)
	  }
	  else {
	    response.notification = codeDictionary.ACC0001
	    res.send(response)
	  }
	})
})

router.post("/login", (req, res, next) => {
	User.authenticate()(req.body.username, req.body.password, (err, user, options) => {
		if (err) return next(err)
		if (user === false) {
      res.send({
        message: options.message,
        success: false
      })
    } else {
      req.login(user, (err) => {
				response.data = req.user
				response.notification = codeDictionary.ACC0002
        res.send(response)
      })
    }
	})
})

router.get("/ping", (req, res) => {
	if (req.user) {
		response.data = req.user
		response.notification = codeDictionary.MDB0001
		res.send(response)
	} else {
		response.data = {}
		response.notification = codeDictionary.MDB0001
		res.send(response)
	}
})

router.post("/logout", (req, res, next) => {
  req.logout()
	response.notification = codeDictionary.ACC0003
  res.send(response)
})

router.post("/logout", (req, res) => {
	response.notification = codeDictionary.ACC0002
  res.send(response)
})

module.exports = router
