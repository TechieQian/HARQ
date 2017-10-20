import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Link} from 'react-router-dom'

function Order(props) {
	const { removeLineItem, putCart } = props
	const { lineitems, active, userId, price } = props.cart
	return (
		<div>
			{ lineitems &&
				lineitems.map(item => {
					return (
						<div key={item.product.id} className="ui blue segment cartLineItem" >
							<h4 className="ui image header" >
			          <img src={item.product.image} className="ui mini rounded image" />
			          <div className="content">
									<Link to={`/product/${item.product.id}`}>
				            {item.product.name}
									</Link>
				           <div className="sub header">
											Qty: {item.qty}<br/>
											Price: ${item.totalPrice}
				          </div>
									{
										active &&
										<div>
											<i
												className="add square icon"
												value={item.id}
												onClick={ ()=> putCart({
														userId,
														cartId : item.orderId,
														productId: item.productId
													})
												}></i>
												<i
													className="minus square icon"
													value={item.id}
													onClick={ ()=> putCart({
															userId,
															cartId : item.orderId,
															productId: item.productId,
															option: 'decrement'
														})
													}></i>
											</div>
									}
			        	</div>
			      </h4>
						{
							active &&
							<button
								className="ui primary button removeLIButton"
								onClick={ removeLineItem }
								value={ item.id }
								>Remove</button>
						}
					</div>
					)
				})
		}
			<div>
				<h5>Order Total: ${ price }</h5>
			</div>
		</div>
	)
}

export default Order
