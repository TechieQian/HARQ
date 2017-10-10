import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store.js'
import {BrowserRouter, Route, NavLink} from 'react-router-dom'
import ProductList from './ProductList'
import Product from './Product'
import Cart from './Cart';
import Login from './Login';

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
								<li>
									<NavLink to="/login" activeClassName="active">Login/Logout</NavLink>
								</li>
							</ul>
					</div>
				<Route exact path='/' component={ProductList} />
				<Route exact path='/products/:productId' component={Product} />
				<Route path='/login' component={Login} />
<<<<<<< HEAD
				<Route path='/yourCart' component={Cart} />
=======
>>>>>>> 07e5bc9a54960ec92a80cfc94614d48c9a22ae79
			</div>
		)
	}
}

export default Main
