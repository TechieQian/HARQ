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
			this.props.putCart({
				userId : this.props.user.id,
				cartId : this.props.cart.id,
				productId
			})
		}
	}

	render(){
		const { products, user } = this.props

		return (
			<div className='container pull-left col-md-8' id='product'>

				{
					user.id ? <h2>{`Hello ${user.name}!`}</h2> : null
				}

				{
					products.map((product)=> {
						return (
							<div key={product.id} className="col-md-4">
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

		getProducts : ()=> { dispatch(fetchProducts()) },
		putCart : (payload) => { dispatch(updateCart(payload)) }
	}
}

export default connect(mapState, mapDispatch)(ProductList)
