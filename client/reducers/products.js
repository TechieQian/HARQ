import axios from 'axios'

//Actions Types
const GET_PRODUCTS = 'GET_PRODUCTS'

//Action Creators
const getProducts = (products) => ({
	type 			: GET_PRODUCTS,
	products 	: products
})

//Thunk Creators
export function fetchProducts() {
	return function thunk(dispatch) {
		axios.get(`/api/products`)
			.then((products)=> {
				dispatch(getProducts(products.data))
			})
	}
}

//Action Reducer
const productReducer = function(state=[], action) {
	switch(action.type) {
		case GET_PRODUCTS :
			return action.products
		default: return state
	}
}

export default productReducer
