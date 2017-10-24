import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store.js'
import {BrowserRouter, Route, NavLink, withRouter} from 'react-router-dom'
import ProductSearch from './ProductSearch'
import Product from './Product'
import Cart from './Cart';
import Login from './Login';
import Admin from './Admin'
import ProductHistory from './ProductHistory'
import Signup from './Signup';
import Analytic from './Analytic';
import Payment from './Payment';
import { verifyUser, loadUser, fetchCart } from '../reducers';

class Main extends Component {

	componentDidMount() {
		const { loginUser, loadSessionUser, getCart } = this.props;
		return loadSessionUser()
		      .then(() => {
		      		const {user} = this.props;
		      		if (user.id) getCart(user.id);
		      })
		      .catch(err => {
		        console.log('error occurred ', err.response.data);
		        throw err;
		      });
	}

	render(){
		const { user } = this.props;
		return (
			<div className="container row">

				<nav className="navbar navbar-toggleable-md navbar-light bg-faded">
					<a className="navbar-brand" href="#">harq store</a>

				  <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
						<ul className="nav navbar-nav mr-auto mt-2 mt-lg-0">
							<li>
								<NavLink to="/" activeClassName="active">home</NavLink>
							</li>
							<li>
								<NavLink to="/login" activeClassName="active">login | logout</NavLink>
							</li>
							{
								this.props.user.id &&
								<li>
									<NavLink to="/history" activeClassName="active">order history</NavLink>
								</li>
							}

							{
								user.admin && (<li>
									<NavLink to="/admin" activeClassName="active">admin</NavLink>
								</li>)
							}

							{
								user.admin && (<li>
									<NavLink to="/analytic" activeClassName="active">analytics</NavLink>
								</li>)
							}

							{
								!user.id && (
									<li>
										<NavLink to="/signup" activeClassName="active">sign-up</NavLink>
									</li>
								)
							}
						</ul>
						<span className="navbar-text pull-right" color="white">
							get to know your e m o t i o n s
						</span>
				  </div>
				</nav>
					<div className="row">
						<Route exact path='/' component={ProductSearch} />
						<Route exact path='/' component={Cart} />
					</div>
				<Route exact path='/products/:productId' component={Product} />
				<Route path='/login' component={Login} />
				<Route path='/history' render={()=><ProductHistory user={this.props.user}/>} />
				<Route path='/signup' component={Signup} />
				<Route path='/admin' component={Admin} />
				<Route path='/analytic' component={Analytic} />
				<Route path='/payment' component={Payment} cart={Cart}/>
			</div>
		)
	}
}

// export default Main  // This is only commented out to set default user


// The following container is needed only to set default user
/* -----------------    CONTAINER     ------------------ */

const mapState = ({user}) => {
  return {
    user
  }
}
const mapDispatch = (dispatch) => {
  return {
    loginUser: function(credential){
      return dispatch(verifyUser(credential));
    },
	getCart : function(id){
		return dispatch(fetchCart(id));
	},
	loadSessionUser: function(){
		return dispatch(loadUser());
	}
  };
};

export default withRouter(connect(mapState, mapDispatch)(Main));
