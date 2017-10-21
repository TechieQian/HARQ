import React, {Component} from 'react'
import {connect} from 'react-redux'
import Order from './Order'
import axios from 'axios'
import ProductHistory from './ProductHistory'

class User extends Component {

	render() {
		const user = this.props.user
		return (
			<div className='panel panel-primary'>
				<div className='panel-heading'>
					{this.props.user.name}
				</div>
				<div className='panel-body'>
					<ul className='list-group'>
						<li className='list-group-item'> name : {user.name} </li>
						<li className='list-group-item'> email : {user.email} </li>
						<li className='list-group-item'> admin : {user.admin} </li>
					</ul>
					<ProductHistory user={this.props.user} />
				</div>
			</div>
		)
	}
}

export default User
