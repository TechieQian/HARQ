import React, {Component} from 'react'
import {connect} from 'react-redux'
import {cartStateMap, cartDispatchMap} from '../mappers'
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

export default connect(cartStateMap,cartDispatchMap)(Cart)
