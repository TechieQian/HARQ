import {combineReducers} from 'redux'
import lineItems from './cart'
import products from './products'
import users from './users'

export default combineReducers({
	lineItems,
	products,
	users
})

export * from './cart'
export * from './products'
export * from './users'
