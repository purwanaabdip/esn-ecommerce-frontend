"use strict"

import axios from "axios"

const url = "http://localhost:3000/auth"

// Login
export const login = (username, password) => {
	return dispatch => {
		dispatch({type: "logging_in"})
		axios({
			method: "POST",
			url: url + "/login",
			data: { username, password },
			withCredentials: true
		})
		.then(response => dispatch({type: "login_successful", payload: response.data.data}))
		.catch(error => console.log(error))
	}
}

// Logout
export const logout = () => {
	return dispatch => {
		dispatch({type: "logging_out"})
		axios({
			method: "POST",
			url: url + "/logout",
			withCredentials: true
		})
		.then(response => dispatch({type: "logout_successful", payload: response.data.data}))
		.catch(error => console.log(error))
	}
}

// Login
export const ping = () => {
	return dispatch => {
		axios.get(url + "/ping", { withCredentials: true })
			.then(response => dispatch({type: "ping_successful", payload: response.data.data}))
			.catch(error => console.log(error))
	}
}
