import React, {Component} from 'react'
import {connect} from 'react-redux'
import {allStateMap, productsDispatchMap} from '../mappers'
import ProductForm from './ProductForm'
import User from './User'
import axios from 'axios'

class Admin extends Component {

	constructor(){
		super()
		this.state = {
			product : {},
			selectedUser : {},
			users : []
		}
		this.handleChange = this.handleChange.bind(this)
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

	handleChange(e){
		if (e.target.name === 'product') {
			const product = this.props.products.find(product=>product.id === +e.target.value)
			if (product) {
				this.setState({product})
			}
			else {
				this.setState({product : {}})
			}
		}
		else {
			const selectedUser = this.state.users.find(order=>order.id === +e.target.value)
			if (selectedUser) {
				this.setState({selectedUser})
			}
			else {
				this.setState({selectedUser : {}})
			}
		}
	}

	render(){
		return (
			<div className='row'>
				<h3> Admin Control Panel </h3>
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
					<ProductForm product={this.state.product} />
				</div>
				<div className='col-sm-4'>
					<h4> User Management </h4>
					<select name='user' className='form-control' onChange={this.handleChange}> 
						<option key={0} value={0}> Anonymous </option>
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
			</div>
		)
	}
}

export default connect(allStateMap,productsDispatchMap)(Admin)
