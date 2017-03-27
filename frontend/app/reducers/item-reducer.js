"use strict"

// Construct initial state
const initialState = {
  items: [],
  item: {},
  activity: "",
  loading: false,
  notification: ""
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case "xhr_start": {
      return {...state, loading: true, notification: { type: "Processing", message: "Please wait" }}
      break
    }
    case "get_items": {
      return {...state, items: action.payload, notification: action.notification, loading: false}
      break
    }
    case "prep_insert_item": {
      return {...state, item: {}, activity: "insert"}
      break
    }
    case "insert_successful": {
      return {...state, notification: action.notification, loading: false}
      break
    }
    case "prep_edit_item": {
      return {...state, item: action.payload, activity: "edit"}
      break
    }
    case "edit_successful": {
      return {...state, notification: action.notification, loading: false}
      break
    }
    case "prep_delete_item": {
      return {...state, item: action.payload, activity: "delete"}
      break
    }
    case "delete_successful": {
      return {...state, notification: action.notification, loading: false}
      break
    }
  }
  return state
}
