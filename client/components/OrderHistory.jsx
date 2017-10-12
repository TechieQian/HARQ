import React, {Component} from 'react'
import {connect} from 'react-redux'

class ProductHistory extends Component {

	constructor() {
		super()
	}

	componentDidMount() {

	}

	render(){
		console.log(this.state.product)
		return (
			<h1> {this.state.product.name} </h1>
		)
	}
}


function mapState({user}){
	return {
		user
	}
}

export default connect(mapState)(Product)
