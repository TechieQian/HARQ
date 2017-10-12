import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store.js'
import {BrowserRouter, Route, NavLink, withRouter} from 'react-router-dom'
import ProductList from './ProductList'
import Product from './Product'
import Cart from './Cart';
import Login from './Login';
import ProductHistory from './ProductHistory'
import { verifyUser, fetchCart } from '../reducers';

class Main extends Component {

	// componentDidMount is only needed for setting default user
	componentDidMount() {
		const { loginUser, getCart } = this.props;
		console.log("*************************Settng Default User to Rav*****************************");
		return loginUser({name: 'Rav'})
		      .then(() => {
					getCart(this.props.user.id);
		      })
		      .catch(err => {
		        console.log('error occurred ', err.response.data);
		        throw err;
		      });
	}

	render(){
		return (
			<div className='container'>
				<h1> HARQ Store </h1>
					<div className="container pull-right">
							<ul className="nav navbar-nav">
								<li>
									<NavLink to="/" activeClassName="active">Home</NavLink>
								</li>
								<li>
									<NavLink to="/login" activeClassName="active">Login/Logout</NavLink>
								</li>
								<li>
									<NavLink to="/history" activeClassName="active">Order History</NavLink>
								</li>
							</ul>
					</div>
					<div className="row">
						<Route exact path='/' component={ProductList} />
						<Route exact path='/' component={Cart} />
					</div>
				<Route exact path='/products/:productId' component={Product} />
				<Route path='/login' component={Login} />
				<Route path='/history' component={ProductHistory} />
			</div>
		)
	}
}

// export default Main  // This is only commented out to set default user


// The following container is needed only to set default user
/* -----------------    CONTAINER     ------------------ */

const mapState = (state) => {
  return {
    user: state.user
  }
}
const mapDispatch = (dispatch) => {
  return {
    loginUser: function(credential){
      return dispatch(verifyUser(credential));
    },
	getCart : function(id){
		return dispatch(fetchCart(id))
	}
  };
};

export default withRouter(connect(mapState, mapDispatch)(Main));
