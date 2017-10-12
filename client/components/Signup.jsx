import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUser } from '../store';
import { Redirect } from 'react-router-dom';

class Signup extends Component {

    constructor(){
        super();
        this.state = {
            userName: ''
        }
        this.handleChange = this.handleChange.bind();
        this.onLoginSubmit = this.onLoginSubmit.bind();
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onLoginSubmit(){
        const { addUser, user } = this.props;
        addUser({name: this.state.userName})
            .then(() =>{
                this.setState({userName: ''});
            })
    }

    render(){
        const { message, user } = this.props;

        if (user.id) {
            return <Redirect to='/' />
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
        user: state.user,
        message: 'Sign up'
    }
}

const mapDispatch = (dispatch) => {
    return { addUser }
}

export default connect(mapState, mapDispatch)(Signup)
