import axios from 'axios';

//Action Types
const GET_CART = 'GET_CART'
const CLEAR_CART = 'CLEAR_CART'
const REMOVE_LINEITEM = 'REMOVE_LINEITEM';

//Action Creators
export function getCart(cart) {
	cart.lineitems.sort((a, b)=>{return b.id - a.id})
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
			.then(cart=>{cart.data})
			.then(cart=> {
				cart.id && dispatch(getCart(cart))
			})
	}
}

export function updateCart(payload) {
	const {productId, userId, cartId, option} = payload
	return function thunk(dispatch) {
		axios.post(`api/products/${productId}/lineItems`,{
			userId,
			cartId,
			option
		})
			.then(cart=>cart.data)
			.then(cart=> {
				dispatch(getCart(cart))
			})
	}
}

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

//Cart Reducer
const cartReducer = function(state = {}, action) {
	switch(action.type) {
		case GET_CART : return action.cart
		case CLEAR_CART : return {}
		case REMOVE_LINEITEM:
 			var lineitems = state.lineitems.filter((lineItem) => {
 				return lineItem.id !== +action.lineItemId
 			})
			return Object.assign({}, state, { lineitems })
		default: return state
	}
};

export default cartReducer
