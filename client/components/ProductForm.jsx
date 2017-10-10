import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateProduct} from '../store.js'

class ProductForm extends Component {

	constructor() {
		super()
		this.state = {id : 0, name : '', price : 0}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentDidMount() {
		const { name, price, id } = this.props.product
		this.setState({name, price, id})
	}

	handleChange(e) {
		this.setState({[e.target.name] : e.target.value})
	}

  handleSubmit(event) {
		event.preventDefault()
    const newProduct = Object.assign(this.props.product, this.state)
    this.props.putProduct(newProduct)
  }

	render(){
		return (
      <div className='col-sm-4'>
        <div className='panel panel-primary'>
          <div className='panel-heading'>
            Edit Product 
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
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                >Save</button>
              </div>          
            </form>
          </div>
        </div>
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
		putProduct : (product)=> { dispatch(updateProduct(product)) }
	}
}

export default connect(mapState,mapDispatch)(ProductForm)
