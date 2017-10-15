import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCart, clearCart} from '../store.js'
import {deleteLineItem} from '../store.js'
import {Link} from 'react-router-dom'
import Order from './Order'
import axios from 'axios'

class Cart extends Component {
	constructor(){
		super()
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit(e) {
		axios.put(`/api/orders/${this.props.cart.id}`, {active : false})
			.then(()=> {
				this.props.emptyCart()
			})
	}
	render() {
		const { lineitems } = this.props.cart
		console.log(lineitems);
		return (
			<div className="container" style={{ float: "right", width: "30%" }}>
				<h1>My Cart </h1>
					{ lineitems &&
						lineitems.map(item => {
							return (
								<div key={item.product.id} style={{ width: "100%" }} >
									<Link to={`/product/${item.product.id}`} style={{ color: "black"}}>
										<h3>
											{item.product.name}
										</h3>
									</Link>
									<b>Qty: {item.qty}</b>
									<button
										className="ui primary button"
										onClick={ this.props.removeLineItem }
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

function mapState({ cart }) {
	return {
		cart
	}
}

function mapDispatch(dispatch) {
	return {
		emptyCart : ()=> { dispatch(clearCart()) },
		removeLineItem: (ev) => {
			ev.preventDefault();
			dispatch(deleteLineItem(ev.target.value))
	 	}
	}
}

export default connect(mapState,mapDispatch)(Cart)
