import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts, updateCart} from '../store.js'
import {Link} from 'react-router-dom'
import axios from 'axios'

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
<<<<<<< HEAD
					<div id='ProductList' style={{ float: "left", width: "70%"}}>
					{
						products.map((product)=> {
							return (
								<div style={{ width: "66%" }}>
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
								</div>
							)
						})
					}
					</div>
				<div>
					<Cart />
				</div>
=======
				{
					products.map((product)=> {
						return (
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
						)
					})
				}
>>>>>>> 5b513c06daaea6d6de6c4f78340087949de326bc
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
