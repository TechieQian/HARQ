import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store.js'
import {BrowserRouter, Route} from 'react-router-dom'
import ProductList from './ProductList'

//This is going to start off as a complicated react component. 
//We can make this dumb later on if needed.

class Main extends Component {

	render(){
		return (
			<div className='container'>
				<h1> HARQ Store </h1>
				<BrowserRouter>
					<Route path='/' component={ProductList} />
				</BrowserRouter>
			</div>
		)
	}
}

function mapState({cart, products, users }) {
	console.log(`got products`, products)
	return {
		cart,
		products,
		users
	}
}

//May need in future
function mapDispatch(dispatch) {
	return {
		getProducts : ()=> { dispatch(fetchProducts())  }
	}

}

export default connect(mapState, mapDispatch)(Main)
