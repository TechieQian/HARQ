import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts, fetchLineItems, deleteLineItem} from '../store.js'
import {Link} from 'react-router-dom'
import axios from 'axios'

class Cart extends Component {

	render( ){
		const { cart } = this.props;

		return (
			<div className="container">
				<h1>My Cart </h1>
					{ cart &&
						cart.map(item => {
	            return (
								<div>
									<li key={item.product.id}>{item.product.name} {item.product.id} Qty: {item.qty}</li>
									<button onClick={this.props.removeLineItem} value={item.id}>Remove</button>
								</div>
							)

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
		cart
	}
}

function mapDispatch(dispatch) {
	return {
		removeLineItem: (ev) => {
			ev.preventDefault();
			dispatch(deleteLineItem(ev.target.value))
	 	}
	}
}


export default connect(mapState, mapDispatch)(Cart)
