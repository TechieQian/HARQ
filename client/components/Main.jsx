import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store.js'
import {BrowserRouter, Route} from 'react-router-dom'
import ProductList from './ProductList'
import Product from './Product'

class Main extends Component {

	render(){
		return (
			<div className='container'>
				<h1> HARQ Store </h1>
				<Route exact path='/' component={ProductList} />
				<Route exact path='/products/:productId' component={Product} />
			</div>
		)
	}
}

export default Main
