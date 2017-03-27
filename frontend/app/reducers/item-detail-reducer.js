"use strict"

// Construct initial state
const initialState = {
  item: {},
  loading: false,
  error: null
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case "xhr_start": {
      return {...state, loading: true}
      break
    }
    case "get_item": {
      return {...state, item: action.payload, loading: false}
      break
    }
  }
  return state
}
