import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store.js'
import {BrowserRouter, Route, NavLink} from 'react-router-dom'
import ProductList from './ProductList'
import Product from './Product'
import Cart from './Cart';

class Main extends Component {

	render(){
		return (
			<div className='container'>
				<h1> HARQ Store </h1>
					<div className="container pull-right">
							<ul className="nav navbar-nav">
								<li>
									<NavLink to="/" activeClassName="active">Home</NavLink>
								</li>
								<li>
									<NavLink to="/yourCart" activeClassName="active">Your Cart</NavLink>
								</li>
							</ul>
					</div>
				<Route exact path='/' component={ProductList} />
				<Route exact path='/products/:productId' component={Product} />
				<Cart user={{id: 1, name : 'qian' }} /> 
			</div>
		)
	}
}

export default Main
