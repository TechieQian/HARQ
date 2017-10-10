import axios from 'axios';

//Action Types
const GET_LINEITEMS = 'GET_LINEITEMS';
const REMOVE_LINEITEM = 'REMOVE_LINEITEM';

//Action Creators
export function getLineItems(lineItems) {
	return {
		type: GET_LINEITEMS,
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

//Reducers

const cartReducer = function(state = [], action) {
	switch(action.type) {
		case GET_LINEITEMS:
			return action.lineItems

		case REMOVE_LINEITEM:
			return state.lineItems.filter((lineItem) => {
				return lineItem.id !== action.lineItemId
			})

		default: return state
	}
};


export default cartReducer;
