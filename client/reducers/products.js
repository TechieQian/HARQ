import axios from 'axios'

//Actions Types
const GET_PRODUCTS = 'GET_PRODUCTS'
const PUT_PRODUCT = 'PUT_PRODUCT'
const POST_PRODUCT = 'POST_PRODUCT'

//Action Creators
const getProducts = (products) => ({
	type 			: GET_PRODUCTS,
	products 	: products
})

const putProduct = product=> ({
	type : PUT_PRODUCT,
	product : product
})

const postProduct = product=> ({
	type : POST_PRODUCT,
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

export function createProduct(product) {
	return function thunk(dispatch) {
		axios.post(`/api/products`, product)
			.then((product)=> {
				dispatch(postProduct(product.data))
			})
	}
}

export function deleteProduct(id) {
	return function thunk(dispatch) {
		axios.delete(`/api/products/${id}`)
			.then(()=> {
				dispatch(fetchProducts())
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
			return newState
		case POST_PRODUCT : 
			return [...state, action.product]
		default: return state
	}
}

export default productReducer
