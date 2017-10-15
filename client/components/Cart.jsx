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
		const { lineitems } = this.props.cart;
		const { removeLineItem } = this.props;
		return (
			<div className="container" style={{ float: "right", width: "30%" }}>
				<h1>My Cart </h1>
				{
					lineitems && <Order lineitems={lineitems} removeLineItem={removeLineItem} />
				}
				{
					lineitems &&
					<button className='btn btn-primary' onClick={this.handleSubmit}>
						Submit Order
					</button>
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
