import React, {Component} from 'react'
import {connect} from 'react-redux'
import {allStateMap, productsDispatchMap} from '../mappers'
import ProductForm from './ProductForm'
import User from './User'
import Order from './Order'
import axios from 'axios'

class Admin extends Component {

	constructor(){
		super()
		this.state = {
			product : {},
			selectedUser : {}, 
			users : [],
			orderId : 0,
			order : {}
		}
		this.handleChange = this.handleChange.bind(this)
		this.searchOrder = this.searchOrder.bind(this)
		this.refresh = this.refresh.bind(this)
	}

	componentDidMount(){
		this.props.getProducts()
		axios.get('/api/users')
			.then(users=>users.data)
			.then(users=> {
				console.log(users)
				this.setState({users})
			})
	}

	refresh(field) {
		const obj = {}
		obj[field] = {}
		this.setState(obj)
	}

	handleChange(e){
		switch(e.target.name) {
			case 'product' :
				const product = this.props.products.find(product=>product.id === +e.target.value)
				product ? this.setState({product}) : this.setState({product : {}})
				break
			case 'user' :
				const selectedUser = this.state.users.find(order=>order.id === +e.target.value)
				selectedUser ? this.setState({selectedUser}) : this.setState({selectedUser : {}})
				break
			case 'orderId' :
				this.setState({orderId : +e.target.value})
				break 
		}
	}

	searchOrder(e){
		e.preventDefault()
		axios.get(`/api/orders/${this.state.orderId}`)
			.then(order=>order.data)
			.then(order=> {
				console.log('setting order state', order)
				this.setState({order})
			})
	}

	render(){
		return (
			<div className='container row'>
				<h3 className="container"> Admin Control Panel </h3>
				<div className='col-sm-4'>
					<h4> Product Management </h4>
					<select name='product' className='form-control' onChange={this.handleChange}>
						<option key={0} value={0}> Add New Product </option>
						{
							this.props.products.map((product)=> {
								return (
									<option key={product.id} value={product.id}>{ product.name }</option>
								)
							})
						}
					</select>
					<br />
					<ProductForm product={this.state.product} refresh={this.refresh}/>
				</div>
				<div className='col-sm-4'>
					<h4> User Management </h4>
					<select name='user' className='form-control' onChange={this.handleChange}> 
						<option key={0} value={0}> -- Please select user -- </option>
						{
							this.state.users && this.state.users.map((user)=> {
								return (
									<option key={user.id} value={user.id}>{ user.name }</option>
								)
							})
						}
					</select>
					<br />
					{this.state.selectedUser.id && <User user={this.state.selectedUser}/> }
				</div>
				<div className='col-sm-4'>
					<h4> Order Search </h4>
					<form onSubmit={this.searchOrder}>
						<div className='form-group'>
							<input
								name='orderId'
								type='number'
								className='form-control'
								value={this.state.orderId} 
								onChange={this.handleChange}
							/>
						</div>
						<button type='submit' className='btn btn-primary'>Search</button>
					</form>
					<br />
					{
						this.state.order.id && 
						<div>
							<h4> Order Id : {this.state.order.id} </h4>
							Customer Id : {this.state.order.userId ? this.state.order.userId : 'Anonymous'}
							<Order order={this.state.order}/> 
						</div>
					}
				</div>
			</div>
		)
	}
}

export default connect(allStateMap,productsDispatchMap)(Admin)
