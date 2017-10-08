import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store.js'
import {Link} from 'react-router-dom'

class ProductList extends Component {

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
									<button className='btn btn-primary' onClick={()=>{}}>
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
