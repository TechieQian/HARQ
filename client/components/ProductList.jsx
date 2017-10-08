import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store.js'

class ProductList extends Component {

	componentDidMount(){
		this.props.getProducts()
	}

	render(){
		return (
			<div>
				<ul>
				{
					this.props.products.map((product)=> {
						<li> {product.name} </li>	
					})
				}
				</ul>
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
