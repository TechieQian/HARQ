import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts, fetchLineItems, deleteLineItem} from '../store.js'
import {Link} from 'react-router-dom'
import axios from 'axios'

class Cart extends Component {

<<<<<<< HEAD
	constructor(props) {
		super(props)
		this.state = {
			currentUser : {},
			cart: []
		}
		this.handleRemove = this.handleRemove.bind(this)
	}
	componentDidMount(){
		axios.get('/api/users/1')
			.then(user=>user.data)
			.then((user)=> {
				var orders = user.orders[0].lineitems
				this.setState({currentUser : user, cart: orders})
			})
	}
	
	handleRemove(ev){
		ev.preventDefault()
		const lineItemId = ev.target.value
		axios.delete(`/api/lineitems/${lineItemId}`)
			.then(()=>{
				const newCart = this.state.cart.filter((lineItem) => {
					return lineItem.id !== lineItemId;
				});
				this.setState({ cart: newCart})
				console.log(this.state);
			})
	}

	render(){
		const {cart} = this.state;
		// const orders = this.state.currentUser.orders
		// if (orders) {
		// 	const activeOrder = orders.filter((order)=> { return order.active })
		// 	lineItems = activeOrder[0].lineitems
		// 	console.log(lineItems.length)
		// 	console.log(lineItems)
		// }
		return (
			  <div>
			      <h1>My Cart </h1>
							{
			          cart.map(item => {
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
=======
	render( ){
		const { cart } = this.props;

		return (
			<div className="container">
				<h1>My Cart </h1>
					{ cart &&
						cart.map(item => {
	            return <li key={item.product.id}>{item.product.name} {item.product.id} {item.qty}</li>
						})
					}
      </div>
>>>>>>> 07e5bc9a54960ec92a80cfc94614d48c9a22ae79
		)
	}
}

function mapState(state) {
	console.log('state', state)
	const cart = state.lineItems;
	return {
		cart
	}
}

<<<<<<< HEAD
// hard-coded the userId and orderId
// will have to pass in route props probably to get these IDs
function mapDispatch(dispatch) {
	return {
    getLineItems: () => { dispatch(fetchLineItems(1,1)) },
	}

}
=======
>>>>>>> 07e5bc9a54960ec92a80cfc94614d48c9a22ae79

export default connect(mapState)(Cart)
