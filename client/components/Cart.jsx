import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts, fetchLineItems} from '../store.js'
import {Link} from 'react-router-dom'
import axios from 'axios'

class Cart extends Component {

	constructor() {
		super()
		this.state = {
			currentUser : {} 
		}
	}
	componentDidMount(){
		axios.get('/api/users/1')
			.then(user=>user.data) 
			.then((user)=> {
				console.log(user)
				this.setState({currentUser : user})	
			})
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
			<div className="container">
				<h1>My Cart </h1> 
        {
          lineItems.map(item => {
            return <li key={item.product.id}>{item.product.name}</li>
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
    getLineItems: () => { dispatch(fetchLineItems(1,1)) }
	}

}

export default connect(mapState, mapDispatch)(Cart)
