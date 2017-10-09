import {combineReducers} from 'redux'
import cart from './cart'
import products from './products'
import users from './users'
import user from './user'

export default combineReducers({
	cart,
	products,
	users,
    user
})

export * from './cart'
export * from './products'
export * from './users'
export * from './user'
