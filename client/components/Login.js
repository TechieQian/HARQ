import React from 'react';
import { connect } from 'react-redux';
import { verifyUser, removeCurrentUser, fetchCart } from '../reducers';
import { Redirect } from 'react-router-dom';

/* -----------------    COMPONENT     ------------------ */

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      error: ''
    };
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
  }

  onLoginSubmit(event) {
    const { message, loginUser } = this.props;
    event.preventDefault();
    loginUser({name: this.state.userName})
      .then(() => {
				this.setState({userName: ''});
				this.props.getCart(this.props.user.id)
      })
      .catch(err => {
        this.setState({error: err.response.data});
      });

  }

  render() {
    const { message, user, logoutUser } = this.props;
    const { error } = this.state;
    // If the user is already logged in, then redirect to home page
    if(user.id) {
      console.log("The logged in user is ", user);
      return (
              <div>
                <h2>Welcome back {user.name}</h2>
                <button onClick={logoutUser} className='btn btn-primary'>Logout</button>
              </div>
      );
    }

    return (
      <div className="signin-container">
        <div className="buffer local">
          <form onSubmit={this.onLoginSubmit}>

            <div className="form-group">
              <label>Name</label>
              {
                error.length > 0 ? <div className="form-group alert alert-danger">{error}</div> : <span></span>
              }
              <input
                name="userName"
                type="userName"
                className="form-control"
                value={this.state.userName}
                onChange={this.handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-block btn-primary">{message}</button>
          </form>
        </div>
      </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = (state) => {
  return {
    message: "Log in",
    user: state.user
  }
}
const mapDispatch = (dispatch) => {
  return {
    loginUser: function(credential){
      return dispatch(verifyUser(credential));
    },

    logoutUser: function(){
      return dispatch(removeCurrentUser());
		},

		getCart : function(id){
			return dispatch(fetchCart(id))
		}
  };
};

export default connect(mapState, mapDispatch)(Login);
