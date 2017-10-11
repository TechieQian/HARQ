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
									<NavLink to="/login" activeClassName="active">Login/Logout</NavLink>
								</li>
							</ul>
					</div>
					<div className="row">
						<Route exact path='/' component={ProductList} />
						<Route exact path='/' component={Cart} />
					</div>
				<Route exact path='/products/:productId' component={Product} />
				<Route path='/login' component={Login} />
			</div>
		)
	}
}

export default Main
