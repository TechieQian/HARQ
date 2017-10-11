import {combineReducers} from 'redux'
import order from './order'
import products from './products'
import users from './users'
import user from './user'

export default combineReducers({
	order,
	products,
	users,
	user
})

export * from './order'
export * from './products'
export * from './users'
export * from './user'
