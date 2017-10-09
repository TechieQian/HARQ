import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts, fetchLineItems} from '../store.js'
import {Link} from 'react-router-dom'

class Cart extends Component {

	componentDidMount(){
		this.props.getLineItems()
	}

	render(){
    const { lineItems } = this.props;
		return (
      <div className="container">
        {
          lineItems.map(item => {
            return <li key={item.product.id}>{item.product.name}</li>
          })
        }
      </div>
		)
	}
}

function mapState({ lineItems }) {
	return {
		lineItems
	}
}

// hard-coded the userId and orderId
// will have to pass in route props probably to get these IDs
function mapDispatch(dispatch) {
	return {
    getLineItems: () => { dispatch(fetchLineItems(1,1)) }
	}

}

export default connect(mapState, mapDispatch)(Cart)
