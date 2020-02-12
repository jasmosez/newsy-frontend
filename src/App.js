import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom'
import AuthorContainer from './Containers/AuthorContainer'
import ShowContainer from './Containers/ShowContainer'
import NavBar from './Components/NavBar'
import HomeContainer from './Containers/HomeContainer';

let API = "http://localhost:3000/authors"


class App extends React.Component {
  state = {
    authors: [],
    currentUser: null
  };

  // On mount fetch all authors
  componentDidMount() {

     const token = localStorage.token;

     this.fetchAuthors()
    //  if (token) {
    //    //get user info
    //     this.checkAutoLogin(token)
    //  } else {
    //    this.props.history.push('/')
    //  }
  }

  checkAutoLogin = (token) => {
    fetch("http://localhost:3001/api/v1/auto_login", {
      headers: {
        Authorization: token
      }
    })
      .then(res => res.json())
      .then(response => {
        if (response.errors) {
          alert(response.errors);
        } else {
          this.setState({
            currentUser: response
          });
        }
      });
  }

  fetchAuthors = () => {
    fetch(API)
      .then(resp => resp.json())
      .then(result =>
        this.setState({
          authors: result
        })
      );
  }


  setUser = response => {
    this.setState(
      {
        currentUser: response.user
      },
      () => {
        localStorage.token = response.token;
        this.props.history.push("/authors");
      }
    );
  };

  logout = () => {
    this.setState(
      {
        currentUser: null
      },
      () => {
        localStorage.removeItem("token");
        this.props.history.push("/login");
      }
    );
  };

  render() {
    console.log("In render. currentUser", this.state.currentUser)
    return (
      <div>
        <Route
          path="/authors"
          render={routerProps => (
            <NavBar routerProps={routerProps} authors={this.state.authors} />
          )}
        />
        <Switch>
          <Route
            path="/authors/:id"
            render={routerProps => (
              <ShowContainer
                routerProps={routerProps}
                updateAuthor={this.updateAuthor}
                currentUser={this.state.currentUser}
              />
            )}
          />
          <Route
            path="/authors"
            render={() => <AuthorContainer authors={this.state.authors} />}
          />
          <Route path="/" render={() => <HomeContainer setUser={this.setUser} /> } />
        </Switch>
      </div>
    );
  }
}

export default App;
