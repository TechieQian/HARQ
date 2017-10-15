import * as store from '../store.js'

export function cartDispatchMap (dispatch) {
	return {
		emptyCart : ()=> { dispatch(store.clearCart()) },
		putCart : (payload) => { dispatch(store.updateCart(payload)) }
	}
}

export function productsDispatchMap (dispatch) {
	return {
		getProducts : ()=> { dispatch(store.fetchProducts()) },
		postProduct : (product)=> { dispatch(store.createProduct(product)) },
		putProduct : (product)=> { dispatch(store.updateProduct(product)) }
	}
}
