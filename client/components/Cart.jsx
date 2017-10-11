import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts, fetchActiveOrder} from '../store.js'
import {Link} from 'react-router-dom'
import axios from 'axios'

class Cart extends Component {
	render(){
		const { order } = this.props;

		return (
			<div className='col-sm-4'>
				<h1>My Cart </h1>
					{ order &&
						order.map(lineitem => {
							{ console.log('map order', order)}
	            return <li key={lineitem.id}>{lineitem.product.name} {lineitem.qty}</li>
						})
					}
      </div>
		)
	}
}

function mapState({ order }) {
	return {
		order
	}
}


export default connect(mapState)(Cart)
