import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts, fetchCart} from '../store.js'
import {Link} from 'react-router-dom'
import axios from 'axios'

class ProductList extends Component {

	constructor() {
		super()
		this.handleAddProduct = this.handleAddProduct.bind(this)
	}

	handleAddProduct (payload) {
		axios.post(`api/products/${payload.productId}/orders/${this.props.cart.id}`)
			.then(()=> {
				this.props.getCart(this.props.user.id)
			})
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
									this.handleAddProduct({	productId : product.id })
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

function mapState({user,products, cart}) {
	return {
		user,
		products,
		cart
	}
}

function mapDispatch(dispatch) {
	return {
		getProducts : ()=> { dispatch(fetchProducts())  },
		getCart : (id) => { dispatch(fetchCart(id)) }
	}
}

export default connect(mapState, mapDispatch)(ProductList)
