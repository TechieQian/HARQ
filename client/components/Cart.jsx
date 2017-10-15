import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCart, clearCart} from '../store.js'
import Order from './Order'
import axios from 'axios'

class Cart extends Component {
	constructor(){
		super()
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit(e) {
		const name = this.props.user.name;
		const email = this.props.user.email;
		const cart = this.props.cart.lineitems;
		const orderId = this.props.cart.id

		console.log('CART', this.props.cart)
		axios.put(`/api/orders/${orderId}`, {active : false})
			.then(()=> {
				this.props.emptyCart()
			})
			.then(()=> {
				axios.post(`/submitted`, { name, email, cart, orderId })
				.then(()=>console.log('sent email!'));
				}
			)
	}

	render() {
		const lineitems = this.props.cart.lineitems
		return (
			<div className='col-sm-4'>
				<h1>My Cart </h1>
					{
						lineitems && <Order lineitems={lineitems} />
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

function mapState({ cart, user }) {
	return {
		cart,
		user
	}
}

function mapDispatch(dispatch) {
	return {
		emptyCart : ()=> { dispatch(clearCart()) }
	}
}

export default connect(mapState,mapDispatch)(Cart)
