import React, {Component} from 'react'
import {connect} from 'react-redux'
import {productsDispatchMap, productsStateMap} from '../mappers'

class ProductForm extends Component {

	constructor() {
		super()
		this.state = {id : 0, name : '', price : 0, description : '', image: ''}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentWillReceiveProps(props) {
		if (!props.product.id) {
			this.setState({id : 0, name : '', price : 0, description : '', image : ''})
		}
		else if (props.product.id != this.props.product.id) {
			const { name, price, id, description, image } = props.product
			this.setState({name, price, id, description, image})
		}
	}

	handleChange(e) {
		this.setState({[e.target.name] : e.target.value})
	}

	handleSubmit(event) {
		console.log('submit is handled')
		event.preventDefault()
		const {name, price, description, image} = this.state
		const existing = this.props.product.id ? this.props.product : {}
		const newProduct = Object.assign(existing, {name, price, description, image})
		if (existing.id) {
			this.props.putProduct(newProduct)
		}
		else {
			this.props.postProduct(newProduct)
		}
  }

	render(){
		return (
			<div className='panel panel-primary'>
				<div className='panel-heading'>
					{this.props.product.id ? 'Edit Product' : 'New Product'}
				</div>
				<div className='panel-body'>
					<form onSubmit={this.handleSubmit}>
						<div className='form-group'>
							<label>Name</label>
							<input
								name='name'
								className='form-control'
								onChange={this.handleChange}
								value={this.state.name}
							/>
						</div>
						<div className='form-group'>
							<label>Price</label>
							<input
								name='price'
								type='number'
								className='form-control'
								value={this.state.price}
								onChange={this.handleChange}
							/>
						</div>
						<div className='form-group'>
							<label>Description</label>
							<textarea
								name='description'
								className='form-control'
								value={this.state.description}
								onChange={this.handleChange}
							/>
						</div>
						<div className='form-group'>
							<label>Image URL</label>
							<input
								name='image'
								type='text'
								className='form-control'
								value={this.state.image}
								onChange={this.handleChange}
							/>
						</div>
						<div className='form-group'>
							<button
								type="submit"
								className="btn btn-primary btn-block"
							>Save</button>
						</div>
						{
							this.props.product.id &&
							<div className='form-group'>
								<button
									type='button'
									onClick={()=> {
										this.props.removeProduct(this.state.id);
										this.props.refresh('product')
									}}
									className="btn btn-danger btn-block"
								>Delete</button>
							</div>
						}
					</form>
				</div>
			</div>
		)
	}
}

export default connect(productsStateMap,productsDispatchMap)(ProductForm)
