"use strict"

import axios from "axios"

const url = "http://localhost:3000/item/"
// Get individual item
export const getItem = id => {
  return dispatch => {
    dispatch({type: "xhr_start"})
  	axios.get(url + id)
      .then(response => dispatch({type: "get_item", payload: response.data.data}))
      .catch(error => console.log(error))
  }
}
