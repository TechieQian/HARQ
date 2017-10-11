import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts, fetchLineItems} from '../store.js'
import {Link} from 'react-router-dom'
import axios from 'axios'

class Cart extends Component {

	constructor() {
		super()
		this.state = {
			lineitems : []
		}
	}
	componentDidMount() {
		
	}

	render( ){
		const { cart } = this.props;

		return (
			<div className='col-sm-4'>
				<h1>My Cart </h1>
					{ cart &&
						cart.map(item => {
	            return <li key={item.product.id}>{item.product.name} {item.product.id} {item.qty}</li>
						})
					}
      </div>
		)
	}
}

function mapState(state) {
	console.log('state', state)
	const cart = state.lineItems;
	return {
		order
	}
}


export default connect(mapState)(Cart)
