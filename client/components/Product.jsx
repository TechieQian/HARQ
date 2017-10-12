import React, {Component} from 'react'
import {connect} from 'react-redux'
import ProductForm from './ProductForm'
import axios from 'axios'

class Product extends Component {

	constructor() {
		super()
		this.state = {
			product : {}
		}
	}

	componentDidMount() {
		const productId = +this.props.match.params.productId
		axios.get(`/api/products/${productId}`)
			.then(product=> product.data)
			.then((product)=> {
				this.setState({product})
			})
	}

	render(){
		return (
			<div> 
				<h3> {this.state.product.name} </h3>
				{this.state.product.name && <ProductForm product={this.state.product}/>}
			</div> 
		)
	}
}


function mapState({products}){
	return {
		products
	}
}

export default connect(mapState)(Product)
