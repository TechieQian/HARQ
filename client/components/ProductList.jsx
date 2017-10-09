import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store.js'
import {Link} from 'react-router-dom'
import axios from 'axios'

class ProductList extends Component {

	constructor() {
		super()
		this.handleAddProduct = this.handleAddProduct.bind(this)
	}

	handleAddProduct (payload) {
		axios.post(`api/products/${payload.productId}/lineitems`, {
			userId : 1
		})
	}

	componentDidMount(){
		this.props.getProducts()
	}

	render(){
		console.log(this.props.products.length)
		return (
			<div>
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
										productId : product.id
									})
									}
								}>
										Add to cart
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

function mapState({products}) {
	console.log('PRODUCTS', products)
	return {
		products
	}
}

function mapDispatch(dispatch) {
	return {
		getProducts : ()=> { dispatch(fetchProducts())  }
	}

}

export default connect(mapState, mapDispatch)(ProductList)
