import React, {Component} from 'react'
import {connect} from 'react-redux'
<<<<<<< HEAD
import {fetchProducts, fetchLineItems, deleteLineItem} from '../store.js'
import {Link} from 'react-router-dom'
=======
import {fetchCart, clearCart} from '../store.js'
import Order from './Order'
>>>>>>> 5b513c06daaea6d6de6c4f78340087949de326bc
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
<<<<<<< HEAD
			<div className="container" style={{ float: "right", width: "30%" }}>
				<h1>My Cart </h1>
					{ cart &&
						cart.map(item => {
							return (
								<div className="ui blue segment" key={item.product.id} style={{ width: "100%" }} >
									<Link to={`/product/${item.product.id}`} style={{ color: "black"}}>
										<h3>
											{item.product.name}
										</h3>
										<img src='https://semantic-ui.com/images/avatar/large/elliot.jpg' className="ui mini rounded image" />
									</Link>
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
=======
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
>>>>>>> 5b513c06daaea6d6de6c4f78340087949de326bc
					}
			</div>

		)
	}
}

<<<<<<< HEAD
function mapState(state) {
	const cart = state.lineItems;
=======
function mapState({ cart }) {
>>>>>>> 5b513c06daaea6d6de6c4f78340087949de326bc
	return {
		cart
	}
}

function mapDispatch(dispatch) {
	return {
<<<<<<< HEAD
		removeLineItem: (ev) => {
			ev.preventDefault();
			dispatch(deleteLineItem(ev.target.value))
	 	}
	}
}


export default connect(mapState, mapDispatch)(Cart)
=======
		emptyCart : ()=> { dispatch(clearCart()) }
	}
}

export default connect(mapState,mapDispatch)(Cart)
>>>>>>> 5b513c06daaea6d6de6c4f78340087949de326bc
