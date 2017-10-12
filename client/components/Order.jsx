import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

function Order(props) {
	const lineitems = props.lineitems
	return (
		<div>
		{
			props.lineitems.map(lineitem=> {
        return <li key={lineitem.id}>{lineitem.product.name} {lineitem.qty}</li>
			})
		}
		</div> 
	)
}

export default Order
