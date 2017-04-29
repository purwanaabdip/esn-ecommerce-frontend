"use strict"

// Construct initial state
const initialState = {
  user: {},
  notification: {},
  logging_in : false,
  logging_out : false,
  error: null
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case "logging_in": {
      return {...state, logging_in: true}
      break
    }
    case "login_successful": {
      return {...state, user: action.payload, notification: action.notification, logging_in: false}
      break
    }
    case "login_failed": {
      return {...state, user: {}, notification: action.payload, logging_in: false}
      break
    }
    case "logging_out": {
      return {...state, logging_out: true}
      break
    }
    case "logout_successful": {
      return {...state, user: {}, logging_out: false}
      break
    }
    case "ping_successful": {
      return {...state, user: action.payload}
      break
    }
  }
  return state
}
