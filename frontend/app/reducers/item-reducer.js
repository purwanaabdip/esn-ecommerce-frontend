"use strict"

// Construct initial state
const initialState = {
  items: [],
  item: {},
  activity: "",
  alert: "",
  loading: false,
  error: null
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case "xhr_start": {
      return {...state, loading: true}
      break
    }
    case "get_items": {
      return {...state, items: action.payload, loading: false}
      break
    }
    case "prep_insert_item": {
      return {...state, item: {}, activity: "insert", alert: ""}
      break
    }
    case "insert_successful": {
      return {...state, alert: "Item successfully created!", loading: false}
      break
    }
    case "prep_edit_item": {
      return {...state, item: action.payload, activity: "edit", alert: ""}
      break
    }
    case "edit_successful": {
      return {...state, alert: "Item successfully updated!", loading: false}
      break
    }
    case "prep_delete_item": {
      return {...state, item: action.payload, activity: "delete", alert: ""}
      break
    }
    case "delete_successful": {
      return {...state, alert: "Item successfully deleted!", loading: false}
      break
    }
  }
  return state
}
