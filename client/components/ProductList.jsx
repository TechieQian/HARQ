import React, {Component} from 'react'
import {connect} from 'react-redux'
import store, {fetchProducts, fetchActiveOrder} from '../store.js'
import {Link} from 'react-router-dom'
import axios from 'axios'

class ProductList extends Component {

	constructor() {
		super()
		this.handleAddProduct = this.handleAddProduct.bind(this)
	}

	handleAddProduct (payload) {

		axios.post(`api/products/${payload.productId}/lineitems`, {
			userId : payload.userId
		})
		.then(()=> store.dispatch(fetchActiveOrder(payload.userId)))
	}

	componentDidMount(){
		this.props.getProducts()
		if (this.props.user.id) {
			console.log('PROPS USER ID EXISTS', this.props.user.id)
			store.dispatch(fetchActiveOrder(this.props.user.id))
		}
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
