import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCart, clearCart} from '../store.js'
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
					{ lineitems &&
						lineitems.map(lineitem => {
	            return <li key={lineitem.id}>{lineitem.product.name} {lineitem.qty}</li>
						})
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
		emptyCart : ()=> { dispatch(clearCart()) }
	}
}

export default connect(mapState,mapDispatch)(Cart)
