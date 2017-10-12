import axios from 'axios'

//Actions Types
const GET_PRODUCTS = 'GET_PRODUCTS'
const PUT_PRODUCT = 'PUT_PRODUCT'

//Action Creators
const getProducts = (products) => ({
	type 			: GET_PRODUCTS,
	products 	: products
})

const putProduct = product=> ({
	type : PUT_PRODUCT,
	product : product
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

export function updateProduct(product) {
	return function thunk(dispatch) {
		axios.put(`/api/products/${product.id}`, product)
			.then(()=> {
				dispatch(fetchProducts()) //This is ugly. Will need to refactor later.
			})
	}
}

//Action Reducer
const productReducer = function(state=[], action) {
	switch(action.type) {
		case GET_PRODUCTS :
			return action.products
		case PUT_PRODUCT :
			const newState = state.slice()
			newState.forEach((product)=> {
				if (product.id === action.product.id) {
					product = Object.assign(product, action.product)
				}
			})
			console.log('newstate', newState)
			return newState
		default: return state
	}
}

export default productReducer
