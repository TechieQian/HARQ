import axios from 'axios';

//Action Types
const GET_CART = 'GET_CART'
const CLEAR_CART = 'CLEAR_CART'

//Action Creators
export function getCart(cart) {
	return {
		type : GET_CART,
		cart
	}
}

export function clearCart() {
	return {
		type : CLEAR_CART
	}
}

//Thunk Creators
export function fetchCart(userId) {
	return function thunk(dispatch){
		axios.get(`/api/users/${userId}/cart`)
			.then(cart=>cart.data)
			.then(cart=> {
				cart.id && dispatch(getCart(cart))
			})
	}
}

export function updateCart(payload) {
	const {productId, userId, cartId} = payload
	return function thunk(dispatch) {
		axios.post(`api/products/${productId}/lineItems`,{
			userId,
			cartId
		})
			.then(cart=>cart.data)
			.then(cart=> {
				dispatch(getCart(cart))
			})
	}
}

//Cart Reducer
const cartReducer = function(state = {}, action) {
	switch(action.type) {
		case GET_CART :	return action.cart
		case CLEAR_CART : return {}
		default: return state
	}
};

export default cartReducer
