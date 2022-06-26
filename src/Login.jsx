import React, { Component } from 'react'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      message: '',
    }
  }

  render() {
    return (
      <div className=''>
        <h4 className='m-1 p-2 border-bottom'>Login</h4>

        <div className='form-group form-row'>
          <label className='col-lg-4'>Email:</label>
          <input
            type='text'
            className='form-control'
            value={this.state.email}
            onChange={(event) => {
              this.setState({ email: event.target.value }) // async method
            }}
          />
        </div>

        <div className='form-group form-row'>
          <label className='col-lg-4'>Password:</label>
          <input
            type='password'
            className='form-control'
            value={this.state.password}
            onChange={(event) => {
              this.setState({ password: event.target.value }) // async method
            }}
          />
        </div>

        <div className='text-right'>
          {this.state.message}
          <button className='btn btn-primary m-1' onClick={this.onLoginClick}>
            Login
          </button>
        </div>
      </div>
    )
  }

  onLoginClick = async () => {
    console.log(this.state)

    var response = await fetch(
      `http://localhost:4000/users?email=${this.state.email}&password=${this.state.password}`
    )

    var body = await response.json()

    if (body.length > 0) {
      // if array has user object. Can be empty array.
      // success
      this.setState({
        message: <span className='text-success'>Successfully Logged-in</span>,
      })
    } else {
      // error
      this.setState({
        message: (
          <span className='text-danger'>Invalid login, please try again</span>
        ),
      })
    }
  }
}
