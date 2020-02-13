import React from 'react'
import {
  Button,
  Form,
  Header,
  Segment
} from "semantic-ui-react";


class Signup extends React.Component {

  state = {
    username: "",
    password: "",
    passwordConfirmation: ""
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitHandler = () => {
    // validate password = password Confirmation
    if (this.state.password === this.state.passwordConfirmation) {
      // fetch
      const configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accepts": "application/json"
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      }

      //form should be reset to blank!!

      fetch(`http://localhost:3000/signup`, configObj)
      .then(resp => resp.json())
      .then(json => {
        if (json.errors) {
          alert(json.errors)
        } else {
          this.props.setUser(json)
          // reroute if successful
        }
      })
    } else {
      alert("Passwords don't match!")
    }

  }

  

  render() {
    return (
      <div>
        <Header as="h2" color="teal" textAlign="center">
          Sign-up for an account
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Username"
              name="username"
              value={this.state.username}
              onChange={this.changeHandler}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.changeHandler}
              type="password"
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password Confirmation"
              name="passwordConfirmation"
              value={this.state.passwordConfirmation}
              onChange={this.changeHandler}
              type="password"
            />
            <Button
              onClick={this.submitHandler}
              color="teal"
              fluid
              size="large"
            >
              Signup
            </Button>
          </Segment>
        </Form>
      </div>
    );
  }
}

export default Signup