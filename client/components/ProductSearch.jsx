import React, {Component} from 'react';
import {connect} from 'react-redux'
import ProductList from './ProductList';
import {fetchProducts} from '../store.js'

class ProductSearch extends Component {
	constructor() {
		super()

		this.state = {
			input: ''
		};

		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		this.setState({ input: event.target.value })
    console.log('state', this.state)
	}

  componentDidMount(){
		this.props.getProducts()
	}

	render(){
		const { user, products } = this.props;

		const product = products.filter(product => {
      return product.name.match(new RegExp(this.state.input, "i"))
    });

		return (
			<div className='container pull-left col-md-8'>
        <div className='col-md-5 pull-right'>
					<form className="navbar-form" role="search">
						<div className="input-group add-on">
							<input className="form-control"
								     placeholder="Search Product Name"
										 id="search"
										 type="text"
										 onChange={ this.handleChange }/>
							<div className="input-group-btn">
								<button className="btn btn-default"
									      type="submit">
									<i className="glyphicon glyphicon-search"></i>
					      </button>
							</div>
						</div>
					</form>
        </div>

				<div className='clearfix'></div>
				{
					product.length ? <ProductList products={product} /> : <ProductList products={products} />
				}
			</div>
		)
	}
}

function mapState({ products }) {
	return {
		products
  }
}

function mapDispatch(dispatch) {
	return {
		getProducts : ()=> { dispatch(fetchProducts()) },
	}
}

export default connect(mapState, mapDispatch)(ProductSearch)
