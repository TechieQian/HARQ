import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Link} from 'react-router-dom'

function Order(props) {
	const { lineitems, removeLineItem } = props
	return (
		<div>
			{ lineitems &&
				lineitems.map(item => {
					return (
						<div key={item.product.id} style={{ width: "100%" }} >
							<Link to={`/product/${item.product.id}`} style={{ color: "black"}}>
								<h3>
									{item.product.name}
								</h3>
							</Link>
							<b>Qty: {item.qty}</b>
							<button
								className="ui primary button"
								onClick={ removeLineItem }
								value={ item.id }
								style={{ marginLeft: "52%" }}
								>Remove</button>
						</div>
					)

				})
		}
		</div>
	)
}

export default Order
