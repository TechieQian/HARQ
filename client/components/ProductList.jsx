import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts, updateCart} from '../store.js'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Cart from './Cart'

class ProductList extends Component {

	constructor() {
		super()

		this.handleAddProduct = this.handleAddProduct.bind(this)
	}

	handleAddProduct (productId) {
		if(!this.props.cart.id) {
			console.log('no id');
			axios.post('/api/orders', {
				userId : this.props.user.id,
				active : true
			})
				.then(order=> {
					this.props.putCart({
						userId : this.props.user.id,
						cartId : order.data.id,
						productId
					})
				})
		}
		else {
			console.log('w/id');
			this.props.putCart({
				userId : this.props.user.id,
				cartId : this.props.cart.id,
				productId
			})
		}
	}

	render(props){
		const products = this.props.products

		return (
			<div className='container pull-left' id='product'>
				{
					products.map((product)=> {
						return (
							<div key={product.id} style={{ width: "66%" }}>
								<div className='col-sm-4' key={product.id}>
										{product.name}
									<div>
										<Link to={{
											pathname : `/products/${product.id}`
										}}> Product Details </Link><br />
								  </div>
									<button className='btn btn-sm btn-primary' onClick={(e)=>{
										e.preventDefault();
										this.handleAddProduct(product.id)
										}
									}>
										Add To Cart
										</button>
								</div>
							</div>
						)
					})
				}
			</div>
		)
	}
}

function mapState({ cart, user }) {
	return {
		cart,
		user
  }
}


function mapDispatch(dispatch) {
	return {
		putCart : (payload) => { dispatch(updateCart(payload)) }
	}
}

export default connect(mapState, mapDispatch)(ProductList)
