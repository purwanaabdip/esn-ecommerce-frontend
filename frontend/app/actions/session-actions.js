"use strict"

import axios from "axios"

const url = "http://localhost:3000/auth"

// Login
export const login = (username, password) => {
	return dispatch => {
		dispatch({type: "logging_in"})
		axios.post(url + "/login", { username, password })
			.then(response => dispatch({type: "login_successful", payload: response.data.data}))
			.catch(error => console.log(error))
	}
}

// Logout
export const logout = (username, password) => {
	return dispatch => {
		dispatch({type: "logging_out"})
		axios.post(url + "/logout", { username, password })
			.then(response => dispatch({type: "logout_successful", payload: response.data.data}))
			.catch(error => console.log(error))
	}
}
