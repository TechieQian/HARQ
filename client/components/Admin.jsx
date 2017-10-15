import React, {Component} from 'react'
import {connect} from 'react-redux'
import {allStateMap, productsDispatchMap} from '../mappers'
import ProductForm from './ProductForm'

class Admin extends Component {

	constructor(){
		super()
		this.state = {
			product : {}
		}
		this.handleChange = this.handleChange.bind(this)
	}

	componentDidMount(){
		this.props.getProducts()
	}

	handleChange(e){
		console.log(e.target.value)
		const product = this.props.products.find(product=>product.id === +e.target.value)
		console.log(product)
		if (product) {
			this.setState({product})
		}
		else {
			this.setState({product : {}})
		}
	}

	render(){
		return (
			<div className='row'>
				<h3> Admin Control Panel </h3>
				<div className='col-sm-4'>
					<h4> Product Management </h4>
					<select name='product' className='form-control' onChange={this.handleChange}>
						<option key={0} value={0}> Add New Product </option>
						{
							this.props.products.map((product)=> {
								return (
									<option key={product.id} value={product.id}>{ product.name }</option>
								)
							})
						}
					</select>
					<br />
					<ProductForm product={this.state.product} />
				</div>
			</div>
		)
	}
}

export default connect(allStateMap,productsDispatchMap)(Admin)
