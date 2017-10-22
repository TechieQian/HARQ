import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

class ProductHistory extends Component {
	constructor(){
		super()
		this.state = {
			orders : []
		}
	}

	componentDidMount() {
		if (this.props.user.id) {
			axios.get(`/api/users/${this.props.user.id}/orders`)
				.then(orders=>orders.data)
				.then((orders)=> {
					orders = orders.filter(order=> !order.active)
					this.setState({orders})
				})
		}
	}

	componentWillReceiveProps(props) {
		if (props.user.id != this.props.user.id) {
			axios.get(`/api/users/${props.user.id}/orders`)
				.then(orders=>orders.data)
				.then((orders)=> {
					orders = orders.filter(order=> !order.active)
					this.setState({orders})
				})
		}
	}

	render(){
		console.log('product history for', this.props.user)
		return (
			<div className="container">
				{
					this.state.orders.map(order=> {
						return (
							<div key={order.id} className="container panel"> 
								Order Id {order.id}
								{
									order.lineitems.map(lineitem => {
										return (
											<li key={lineitem.id}> {lineitem.product.name + " x " + lineitem.qty} </li>
										)
									})
								}
							</div>
						)
					})
				}
			</div>
		)
	}
}

export default ProductHistory
