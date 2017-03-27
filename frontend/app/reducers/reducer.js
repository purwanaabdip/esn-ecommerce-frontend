"use strict"

import { combineReducers } from "redux"
import user from "./user-reducer"
import item from "./item-reducer"
import itemDetail from "./item-detail-reducer"

export default combineReducers({
  user,
  item,
  itemDetail
})
