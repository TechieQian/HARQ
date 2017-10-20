import React, {Component} from 'react'
import {connect} from 'react-redux'
import Order from './Order'
import axios from 'axios'
import ProductHistory from './ProductHistory'

class User extends Component {

	render() {
		console.log('user comp', this.props.user)
		return (
			<div className='panel panel-primary'>
				<div className='panel-heading'>
					{this.props.user.name}
				</div>
				<div className='panel-body'>
					<ProductHistory user={this.props.user} />
				</div>
			</div>
		)
	}
}

export default User
