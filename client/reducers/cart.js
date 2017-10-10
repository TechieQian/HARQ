import axios from 'axios';
//import Order from '../../server/db/Order';
//Action Types
const GET_USER_LINEITEMS = 'GET_USER_LINEITEMS';

//Action Creators
export function getUserLineItems(lineItems) {
	return {
		type: GET_USER_LINEITEMS,
		lineItems
	};
};

//Thunk Creators
// export function fetchUserLineItems(userId) {
// 	return function thunk(dispatch){
// 		axios.get(`/api/users/${userId}`)
// 		.then(res => res.data)
// 		.then(user => {
// 			console.log('thunk user', user)
// 			return Order.getActiveOrderByUser(user.id)
// 		})
// 		.then(lineitems => {
// 			console.log('thunk lineitems', lineitems)
// 			const action = getUserLineItems(lineitems);
// 			dispatch(action);
// 		})
// 	};
// };

const cartReducer = function(state = [], action) {
	switch(action.type) {
		case GET_USER_LINEITEMS:
			return action.lineItems
		default: return state
	}
};


export default cartReducer;
