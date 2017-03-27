"use strict"

import { combineReducers } from "redux"
import user_store from "./user-reducer"
import item_store from "./item-reducer"
import item_detail_store from "./item-detail-reducer"

export default combineReducers({
  user_store,
  item_store,
  item_detail_store
})
