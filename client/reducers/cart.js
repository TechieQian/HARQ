import axios from 'axios';

//Action Types
<<<<<<< HEAD
const GET_USER_LINEITEMS = 'GET_USER_LINEITEMS';
const REMOVE_LINEITEM = 'REMOVE_LINEITEM';
=======
const GET_CART = 'GET_CART'
const CLEAR_CART = 'CLEAR_CART'
>>>>>>> 5b513c06daaea6d6de6c4f78340087949de326bc

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

export function removeLineItem(lineItemId) {
 	return {
 		type: REMOVE_LINEITEM,
 		lineItemId
 	};
 };

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

<<<<<<< HEAD
export function deleteLineItem(lineItemId) {
 	return function thunk(dispatch){
 		axios.delete(`/api/lineitems/${lineItemId}`)
 			.then(res => res.data)
 			.then(()=>{
 				const action = removeLineItem(lineItemId);
 				dispatch(action);
 			})
 	}
 }

const cartReducer = function(state = [], action) {
	switch(action.type) {
		case GET_USER_LINEITEMS:
			return action.lineItems

		case REMOVE_LINEITEM:
 			return state.filter((lineItem) => {
 				return lineItem.id !== +action.lineItemId
 			})

=======
//Cart Reducer
const cartReducer = function(state = {}, action) {
	switch(action.type) {
		case GET_CART :	return action.cart
		case CLEAR_CART : return {}
>>>>>>> 5b513c06daaea6d6de6c4f78340087949de326bc
		default: return state
	}
};

export default cartReducer
