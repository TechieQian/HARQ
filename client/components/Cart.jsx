import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store.js'
import axios from 'axios'

class Cart extends Component {
	render(){
		const lineitems = this.props.cart.lineitems
		return (
			<div className='col-sm-4'>
				<h1>My Cart </h1>
					{ lineitems &&
						lineitems.map(lineitem => {
	            return <li key={lineitem.id}>{lineitem.product.name} {lineitem.qty}</li>
						})
					}
      </div>
		)
	}
}

function mapState({ cart }) {
	return {
		cart
	}
}


export default connect(mapState)(Cart)
