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
		const { lineitems, active } = this.props.cart;
		const { removeLineItem } = this.props;
		return (
			<div className="ui segment" style={{ float: "right", width: "30%" }}>
				<h1>My Cart </h1>
				{
					!lineitems &&
					<b>Your Cart Is Empty</b>
				}
          {
            lineitems && <Order active={active} lineitems={lineitems} removeLineItem={removeLineItem} />
          }
          {
            lineitems &&
            <button disabled={!lineitems.length} className='btn btn-primary' onClick={this.handleSubmit} style={{marginTop: "2%"}}>
              Submit Order
            </button>
          }
			</div>
		)
	}
}

export default connect(cartStateMap,cartDispatchMap)(Cart)
