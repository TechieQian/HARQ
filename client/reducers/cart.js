import axios from 'axios';
//import Order from '../../server/db/Order';
//Action Types
const GET_USER_LINEITEMS = 'GET_USER_LINEITEMS';
const REMOVE_LINEITEM = 'REMOVE_LINEITEM';

//Action Creators
export function getUserLineItems(lineItems) {
	return {
		type: GET_USER_LINEITEMS,
		lineItems
	};
};

export function removeLineItem(lineItemId) {
 	return {
 		type: REMOVE_LINEITEM,
 		lineItemId
 	};
 };

//Thunk Creators
export function fetchUserLineItems(userId) {
	return function thunk(dispatch){
		axios.get(`/api/users/${userId}`)
		.then(res => res.data)
		.then(user => {
			const activeOrder = user.orders.filter(order => {
				return order.active == true
			})

			console.log('active orders', activeOrder)

			if (activeOrder.length == 1) {
				console.log('yo', activeOrder[0].lineitems)
				dispatch(getUserLineItems(activeOrder[0].lineitems))
			}
		})
	};
};

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

		default: return state
	}
};


export default cartReducer;
