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

	componentDidMount(){
		this.props.getProducts()
	}

	render(){
		const { user, products } = this.props;

		return (
			<div className='col-sm-8'>
				{
					user.id ? <h2>{`Hello ${user.name}!`}</h2> : null
				}
				<div id='productList'>
					{
						products.map((product)=> {
							return (
								<div key={product.id} className="listedProduct" >
									<div className='col-sm-4' key={product.id}>
										<div className='panel panel-body'>
											{product.name}
											<Link to={{
												pathname : `/products/${product.id}`
											}}> Product Details </Link><br />
										<button className='btn btn-primary' onClick={(e)=>{
											e.preventDefault();
											this.handleAddProduct(product.id)
											}
										}>
												Add To Cart
											</button>
										</div>
									</div>
								</div>
							)
						})
					}
					</div>
			</div>
		)
	}
}

function mapState({user,products, cart}) {
	return {
		user,
		products,
		cart
	}
}

function mapDispatch(dispatch) {
	return {
		getProducts : ()=> { dispatch(fetchProducts()) },
		putCart : (payload) => { dispatch(updateCart(payload)) }
	}
}

export default connect(mapState, mapDispatch)(ProductList)
