// ================================
// Created by Eka Setya Nugraha.
// Copyright 03/25/2017.
// ================================
"use strict"
import axios from "axios"
import dispatcher from "../dispatcher"

const url = "http://localhost:3000/auth"

// Login
export const login = (username, password) => {
	axios.post(url + "/login", { username, password })
		.then(response => dispatcher.dispatch({type: "login_successful", data: response.data.data}))
		.catch(error => console.log(error))
}

// Logout
export const logout = (username, password) => {
	axios.post(url + "/logout")
		.then(response => dispatcher.dispatch({type: "logout_successful", data: response.data.data}))
		.catch(error => console.log(error))
}
