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
						<div key={item.product.id} className="ui blue segment" style={{ width: "100%" }} >
							<h4 className="ui image header" style={{display:"inline", width:"70%"}}>
			          <img src="https://semantic-ui.com/images/avatar/large/joe.jpg" style={{ width: "15%" }} className="ui mini rounded image" />
			          <div className="content">
									<Link to={`/product/${item.product.id}`} style={{ color: "black"}}>
				            {item.product.name}
									</Link>
				           <div className="sub header">
											Qty: {item.qty}
				          </div>
			        	</div>
			      </h4>
						<button
							className="ui primary button"
							onClick={ removeLineItem }
							value={ item.id }
							style={{ float: "right" }}
							>Remove</button>
					</div>
					)

				})
		}
		</div>
	)
}

export default Order
