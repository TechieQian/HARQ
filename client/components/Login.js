import React from 'react';
import { connect } from 'react-redux';
import { verifyUser } from '../reducers';
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

  render() {
    const { message, user } = this.props;
    const { error } = this.state;
    // If the user is already logged in, then redirect to home page
    if(user.id) {
      console.log("The logged in user is ", user);
      return (<Redirect to="/" />);
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

  onLoginSubmit(event) {
    const { message, loginUser } = this.props;
    event.preventDefault();
    loginUser({name: this.state.userName})
      .catch(err => {
        console.log('error occurred ', err.response.data);
        this.setState({error: err.response.data});
      });

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
    }
  };
};

export default connect(mapState, mapDispatch)(Login);
