import React from 'react';
import { connect } from 'react-redux';
import { verifyUser } from '../reducers';

/* -----------------    COMPONENT     ------------------ */

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: ''
    };
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
  }

  handleChange(event) {
    let name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
  }

  render() {
    const { message } = this.props;
    return (
      <div className="signin-container">
        <div className="buffer local">
          <form onSubmit={this.onLoginSubmit}>
            <div className="form-group">
              <label>name</label>
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
      });

  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = () => ({ message: 'Log in' });
const mapDispatch = (dispatch) => {
  return {
    loginUser: function(credential){
      return dispatch(verifyUser(credential));
    }
  };
};

export default connect(mapState, mapDispatch)(Login);
