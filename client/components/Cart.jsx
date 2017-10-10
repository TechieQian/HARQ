import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts, fetchLineItems, deleteLineItem} from '../store.js'
import {Link} from 'react-router-dom'
import axios from 'axios'

class Cart extends Component {

	constructor(props) {
		super(props)
		this.state = {
			currentUser : {},

		}
		this.handleRemove = this.handleRemove.bind(this)
	}
	componentDidMount(){
		axios.get('/api/users/1')
			.then(user=>user.data)
			.then((user)=> {
				console.log(user)
				this.setState({currentUser : user})
			})
	}
	handleRemove(ev){
		ev.preventDefault()
		this.props.removeLineItem(ev.target.value)
	}

	render(){
		let lineItems = []
		const orders = this.state.currentUser.orders
		if (orders) {
			const activeOrder = orders.filter((order)=> { return order.active })
			lineItems = activeOrder[0].lineitems
			console.log(lineItems.length)
			console.log(lineItems)
		}
		return (
			  <div>
			      <h1>My Cart </h1>
							{
			          lineItems.map(item => {
			            return (
										<div className="ui red segment" key={item.product.id} style={{ width: "50%" }} >
											<h3><Link to={`/product/${item.product.id}`} style={{ color: "black"}}>
												{item.product.name}
											</Link></h3>
											<b>Qty: {item.qty}</b>
											<button
												onClick={ this.handleRemove }
												className="ui red button"
												value={ item.id }
												style={{ marginLeft: "75%" }}
												>Remove</button>
										</div>
									)
			          })
			        }
			   </div>
		)
	}
}

function mapState({ lineItems }) {
	return {
		lineItems
	}
}

// hard-coded the userId and orderId
// will have to pass in route props probably to get these IDs
function mapDispatch(dispatch) {
	return {
    getLineItems: () => { dispatch(fetchLineItems(1,1)) },
		removeLineItem: (lineItemId) => {
			dispatch(deleteLineItem(lineItemId))
			dispatch(fetchLineItems(1,1))
		}
	}

}

export default connect(mapState, mapDispatch)(Cart)
