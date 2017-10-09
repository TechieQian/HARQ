import React, {Component} from 'react'
import {connect} from 'react-redux'

class Product extends Component {

	constructor() {
		super()
		this.state = {
			product : {}
		}
	}

	componentDidMount() {
		const productId = +this.props.match.params.productId
		this.props.products.find((product)=>{
			this.setState({product})
		})
	}

	render(){
		console.log(this.state.product)
		return (
			<h1> {this.state.product.name} </h1>
		)
	}
}


function mapState({products}){
	return {
		products
	}
}

export default connect(mapState)(Product)
