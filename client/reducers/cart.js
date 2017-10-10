import axios from 'axios';

//Action Types
const GET_LINEITEMS = 'GET_LINEITEMS';

//Action Creators
export function getLineItems(lineItems) {
	return {
		type: GET_LINEITEMS,
		lineItems
	};
};

//Thunk Creators
export function fetchLineItems(userId, orderId) {
	return function thunk(dispatch){
		axios.get(`/api/lineitems/${userId}/${orderId}`)
		.then(res => res.data)
		.then(lineitems => {
			const action = getLineItems(lineitems);
			dispatch(action);
		})
	};
};


//Reducers

const cartReducer = function(state = [], action) {
	switch(action.type) {
		case GET_LINEITEMS:
			return action.lineItems

		default: return state
	}
};


export default cartReducer;
