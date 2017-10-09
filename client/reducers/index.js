import {combineReducers} from 'redux'
import lineItems from './cart'
import products from './products'
import users from './users'
import user from './user'

export default combineReducers({
	lineItems,
	products,
	users,
    user
})

export * from './cart'
export * from './products'
export * from './users'
export * from './user'
