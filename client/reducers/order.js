import axios from 'axios';

//Action Types
const GET_ACTIVE_ORDER = 'GET_ACTIVE_ORDER';

//Action Creators
export function getActiveOrder(order) {
	return {
		type: GET_ACTIVE_ORDER,
		order
	};
};

//Thunk Creators
export function fetchActiveOrder(userId) {
	return function thunk(dispatch){
		axios.get(`/api/users/${userId}/activeorder`)
		.then(res => {
			console.log('RES', res)
			// res.data returns an array of an object (which is the active order)
			return res.data
		})
		.then(order => {
			console.log('USER ACTIVE ORDER', order.lineitems)
			dispatch(getActiveOrder(order.lineitems))
		})
	};
};

const orderReducer = function(state = [], action) {
	switch(action.type) {
		case GET_ACTIVE_ORDER:
			return action.order
		default: return state
	}
};


export default orderReducer;
