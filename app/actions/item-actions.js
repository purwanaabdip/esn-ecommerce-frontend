"use strict"

import axios from "axios"

const url = "http://localhost:3000/item"
// Get all items
export const getItems = (searchTerm = "") => {
	return dispatch => {
		dispatch({type: "xhr_start"})
		axios.get(url + "?search=" + searchTerm)
			.then(response => dispatch({type: "get_items", payload: response.data.data, notification: response.data.notification}))
			.catch(error => console.log(error))
	}
}

// Insert item preparation
export const prepInsertItem = item => {
	return dispatch => dispatch({type: "prep_insert_item", payload: item})
}

// Insert new item
export const insertItem = item => {
	return dispatch => {
		dispatch({type: "xhr_start"})
		axios.post(url, item)
			.then(response => dispatch({type: "insert_successful", notification: response.data.notification}))
			.catch(error => console.log(error))
	}
}

// Edit item preparation
export const prepEditItem = item => {
	return dispatch => dispatch({type: "prep_edit_item", payload: item})
}

// Edit item
export let editItem = item => {
	return dispatch => {
		dispatch({type: "xhr_start"})
		axios.put(url, item)
			.then(response => dispatch({type: "edit_successful", notification: response.data.notification}))
			.catch(error => console.log(error))
	}
}

// Delete item preparation
export const prepDeleteItem = item => {
	return dispatch => dispatch({type: "prep_delete_item", payload: item})
}

// Delete item
export const deleteItem = item => {
	return dispatch => {
		dispatch({type: "xhr_start"})
		item.meta.deletedAt = new Date()
		item.meta.deletedBy = "58834b9567c5f223888d2e5b"
		axios.put(url, item)
			.then(response => dispatch({type: "delete_successful", notification: response.data.notification}))
			.catch(error => console.log(error))
	}
}

// Upload item image
export const uploadImage = item => {
	let data = new FormData()
	data.append("test", item)
	return dispatch => {
		dispatch({type: "xhr_start"})
		axios.post("http://localhost:3000/upload", data)
			.then(response => dispatch({type: "upload_successful", payload: response.data.data, notification: response.data.notification}))
			.catch(error => console.log(error))
	}
}
