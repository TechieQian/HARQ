import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store.js'

//This is going to start off as a complicated react component. 
//We can make this dumb later on if needed.

class Main extends Component {

	componentDidMount() {
		this.props.getProducts()		
	}

	render(){
		return (
			<div>
				We are react now. See dev console for product list
			</div>
		)
	}
}

function mapState({cart, products, users }) {
	console.log(`got products`, products)
	return {
		cart,
		products,
		users
	}
}

//May need in future
function mapDispatch(dispatch) {
	return {
		getProducts : ()=> { dispatch(fetchProducts())  }
	}

}

export default connect(mapState, mapDispatch)(Main)
