import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts, fetchLineItems, deleteLineItem} from '../store.js'
import {Link} from 'react-router-dom'
import axios from 'axios'

class Cart extends Component {

	render( ){
		const { cart } = this.props;

		return (
			<div className="container" style={{ float: "right", width: "30%" }}>
				<h1>My Cart </h1>
					{ cart &&
						cart.map(item => {
							return (
								<div className="ui blue segment" key={item.product.id} style={{ width: "100%" }} >
									<h3><Link to={`/product/${item.product.id}`} style={{ color: "black"}}>
										{item.product.name}
									</Link></h3>
									<b>Qty: {item.qty}</b>
									<button
										onClick={ this.props.removeLineItem }
										className="ui red button"
										value={ item.id }
										style={{ marginLeft: "52%" }}
										>Remove</button>
								</div>
							)

						})
					}
      </div>
		)
	}
}

function mapState(state) {
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
