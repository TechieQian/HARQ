import {combineReducers} from 'redux'
import cart from './cart'
import products from './products'
import users from './users'

export default combineReducers({
	cart,
	products,
	users
})
