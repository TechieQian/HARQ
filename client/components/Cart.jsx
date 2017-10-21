import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteLineItem} from '../store.js'
import {Link} from 'react-router-dom'
import {cartStateMap, cartDispatchMap} from '../mappers'
import Order from './Order'
import axios from 'axios'

class Cart extends Component {
	constructor(){
		super()
		this.state = {
			totalPrice : 0
		}
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit(e) {
		const name = this.props.user.name;
		const email = this.props.user.email;
		const cart = this.props.cart.lineitems;
		const orderId = this.props.cart.id

		axios.put(`/api/orders/${orderId}`, {active : false})
			.then(()=> {
				this.props.emptyCart()
			})
			.then(()=> {
				if (email) {
					axios.post(`/submitted`, { name, email, cart, orderId })
					.then(()=>{
						res.sendStatus(200)
					})
				};
			})
			.then(()=>{
				alert('Order Submitted')
			})
	}

	render() {
		const { cart, removeLineItem, putCart } = this.props;
		const { lineitems } = cart;
		return (
			<div className="ui segment pull-right col-md-4 cartObject">
				<h1>My Cart </h1>
          {
            lineitems && <Order order={cart} removeLineItem={removeLineItem} putCart={putCart} />
					}
					<button disabled={!lineitems || !lineitems.length} className='btn btn-primary submitButton' onClick={this.handleSubmit}>
						Submit Order
					</button>
			</div>
		)
	}
}

export default connect(cartStateMap,cartDispatchMap)(Cart)
