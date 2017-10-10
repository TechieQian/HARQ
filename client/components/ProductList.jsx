import React, {Component} from 'react'
import {connect} from 'react-redux'
import store, {fetchProducts} from '../store.js'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Cart from './Cart';

class ProductList extends Component {

	constructor() {
		super()
		this.handleAddProduct = this.handleAddProduct.bind(this)
	}

	handleAddProduct (payload) {
		console.log('payload', payload);

		axios.post(`api/products/${payload.productId}/lineitems`, {
			userId : payload.userId
		})

		// store.dispatch(fetchUserLineItems(payload.userId))
	}

	componentDidMount(){
		this.props.getProducts()
	}

	render(){
		console.log(this.props.products.length)
		const { user } = this.props;
		console.log('logged in user is', user)
		return (
			<div>
				{
					user.id ? <h2>{`Hello ${user.name}!`}</h2> : null
				}
				{
					this.props.products.map((product)=> {
						return (
							<div className='col-sm-4' key={product.id}>
								<div className='panel panel-body'>
									{product.name}
									<Link to={{
										pathname : `/products/${product.id}`
									}}> Product Details </Link><br />
								<button className='btn btn-primary' onClick={(e)=>{
									e.preventDefault();
									this.handleAddProduct({
										productId : product.id,
										userId: user.id
									})
									}
								}>
										Add To Cart
									</button>
								</div>
							</div>
						)
					})
				}
				<Cart />
			</div>
		)
	}
}

function mapState({products, user}) {
	return {
		products,
		user
	}
}

function mapDispatch(dispatch) {
	return {
		getProducts : ()=> { dispatch(fetchProducts())  }
	}

}

export default connect(mapState, mapDispatch)(ProductList)
